/**
 * SiteForge — Supabase Integration & Cloud Save Database Connector
 * 
 * =========================================================================
 * SUPABASE DATABASE SETUP SCHEMA
 * =========================================================================
 * To save projects to Supabase, create a table named 'projects' in your database:
 * 
 * CREATE TABLE projects (
 *   id text PRIMARY KEY,                   -- Project identifier
 *   updated_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL,
 *   title TEXT NOT NULL,                   -- Page SEO Title
 *   description TEXT,                      -- Page SEO Description
 *   font_headings TEXT DEFAULT 'Outfit',   -- Headings font family
 *   font_body TEXT DEFAULT 'Inter',        -- Body font family
 *   blocks JSONB NOT NULL                  -- Blocks configuration JSON array
 * );
 * 
 * -- Enable Row Level Security (RLS) if you wish, or add public read/write access policies:
 * CREATE POLICY "Enable access for everyone" ON projects FOR ALL USING (true) WITH CHECK (true);
 * =========================================================================
 */

// --- DEFAULT CONFIGURATION (You can fill these for your buyer) ---
const DEFAULT_SUPABASE_URL = "https://opiqyilnaubbzqmkinlf.supabase.co"; // e.g. "https://opiqyilnaubbzqmkinlf.supabase.co"
const DEFAULT_SUPABASE_KEY = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im9waXF5aWxuYXViYnpxbWtpbmxmIiwicm9sZSI6ImFub24iLCJpYXQiOjE3ODI1NjY3OTcsImV4cCI6MjA5ODE0Mjc5N30.icsvi31PTbhsLJQ0BmksWu2kX0gdjwj6eyV2nnI5a9I"; // e.g. "your-anon-key-here"

let supabaseClient = null;

// On load, check if connection keys are already saved in localStorage or defaults are set
document.addEventListener("DOMContentLoaded", () => {
    const savedUrl = localStorage.getItem("siteforge_supabase_url") || DEFAULT_SUPABASE_URL;
    const savedKey = localStorage.getItem("siteforge_supabase_key") || DEFAULT_SUPABASE_KEY;

    if (savedUrl && savedKey) {
        document.getElementById("supabase-url").value = savedUrl;
        document.getElementById("supabase-key").value = savedKey;
        initializeSupabase(savedUrl, savedKey);
    }

    // Bind modal actions
    document.getElementById("btn-connect-supabase").addEventListener("click", () => {
        const url = document.getElementById("supabase-url").value.trim();
        const key = document.getElementById("supabase-key").value.trim();

        if (!url || !key) {
            alert("Please fill in both Supabase URL and Anon Key.");
            return;
        }

        initializeSupabase(url, key, true);
    });

    document.getElementById("btn-save-project").addEventListener("click", () => {
        saveProjectToSupabase();
    });

    document.getElementById("btn-load-project").addEventListener("click", () => {
        loadProjectFromSupabase();
    });
});

/**
 * Dynamically inject Supabase CDN and initialize client
 */
function initializeSupabase(url, key, alertSuccess = false) {
    const badge = document.getElementById("db-status-badge");
    const statusText = document.querySelector("#save-status .status-text");

    // Helper to setup client once script is loaded
    const setupClient = () => {
        try {
            supabaseClient = supabase.createClient(url, key);
            
            // Save to localStorage
            localStorage.setItem("siteforge_supabase_url", url);
            localStorage.setItem("siteforge_supabase_key", key);

            // Update badge UI
            const welcomeBadge = document.getElementById("welcome-db-badge");
            [badge, welcomeBadge].forEach(b => { if (b) b.className = "connection-status badge-connected"; });
            if (typeof applyLanguage === "function") {
                applyLanguage(currentLang);
            } else {
                [badge, welcomeBadge].forEach(b => { if (b) b.innerHTML = `<i class="fa-solid fa-circle-dot"></i> Connected`; });
            }
            
            statusText.textContent = "Connected to Supabase Cloud";
            document.querySelector("#save-status .status-icon").style.color = "#10b981";

            if (alertSuccess) {
                alert("Connected successfully to Supabase!");
                document.getElementById("supabase-modal").style.display = "none";
            }
        } catch (e) {
            console.error("Failed to init Supabase client", e);
            const welcomeBadge = document.getElementById("welcome-db-badge");
            [badge, welcomeBadge].forEach(b => {
                if (b) {
                    b.className = "connection-status badge-disconnected";
                    b.innerHTML = `<i class="fa-solid fa-triangle-exclamation"></i> Error`;
                }
            });
            if (alertSuccess) alert("Connection failed: " + e.message);
        }
    };

    // If script isn't loaded yet, inject CDN script
    if (typeof supabase === "undefined") {
        const script = document.createElement("script");
        script.src = "https://cdn.jsdelivr.net/npm/@supabase/supabase-js@2.39.0/dist/umd/supabase.js";
        script.onload = setupClient;
        script.onerror = () => {
            alert("Failed to load Supabase script from CDN. Check your internet connection.");
            badge.className = "connection-status badge-disconnected";
            badge.innerHTML = `<i class="fa-solid fa-circle-dot"></i> Disconnected`;
        };
        document.head.appendChild(script);
    } else {
        setupClient();
    }
}

/**
 * Save project schema object to Supabase database table
 */
async function saveProjectToSupabase() {
    if (!supabaseClient) {
        alert("Please connect your Supabase database first!");
        document.getElementById("btn-supabase").click();
        return;
    }

    const saveBtn = document.getElementById("btn-save-project");
    const originalHtml = saveBtn.innerHTML;
    saveBtn.disabled = true;
    saveBtn.innerHTML = `<i class="fa-solid fa-spinner fa-spin"></i> Saving...`;

    // We use a fixed ID for the draft project, or create/retrieve one
    let projectId = localStorage.getItem("siteforge_project_id");
    if (!projectId) {
        projectId = "project_" + Math.random().toString(36).substring(2, 11);
        localStorage.setItem("siteforge_project_id", projectId);
    }

    const payload = {
        id: projectId,
        title: projectState.title,
        description: projectState.description,
        font_headings: projectState.fontHeadings,
        font_body: projectState.fontBody,
        blocks: projectState.blocks,
        updated_at: new Date().toISOString()
    };

    try {
        const { data, error } = await supabaseClient
            .from('projects')
            .upsert(payload, { onConflict: 'id' });

        if (error) throw error;

        // Visual success notification in header
        const statusText = document.querySelector("#save-status .status-text");
        statusText.textContent = "Saved to Supabase Cloud";
        const statusIcon = document.querySelector("#save-status .status-icon");
        statusIcon.className = "fa-solid fa-cloud-arrow-up status-icon";
        statusIcon.style.color = "#10b981";

        setTimeout(() => {
            statusIcon.className = "fa-solid fa-cloud-check status-icon";
        }, 3000);

        alert("Project saved successfully to your Supabase cloud!");
        document.getElementById("supabase-modal").style.display = "none";
    } catch (e) {
        console.error("Supabase Save Error", e);
        alert("Failed to save project: " + e.message + "\n\nDid you create the 'projects' table inside your Supabase dashboard? Look at the setup instructions in 'supabase.js'.");
    } finally {
        saveBtn.disabled = false;
        saveBtn.innerHTML = originalHtml;
    }
}

/**
 * Load project configuration from Supabase database
 */
async function loadProjectFromSupabase() {
    if (!supabaseClient) {
        alert("Please connect your Supabase database first!");
        document.getElementById("btn-supabase").click();
        return;
    }

    const loadBtn = document.getElementById("btn-load-project");
    const originalHtml = loadBtn.innerHTML;
    loadBtn.disabled = true;
    loadBtn.innerHTML = `<i class="fa-solid fa-spinner fa-spin"></i> Loading...`;

    let projectId = localStorage.getItem("siteforge_project_id");
    if (!projectId) {
        alert("No saved project found in your local draft to match database records.");
        loadBtn.disabled = false;
        loadBtn.innerHTML = originalHtml;
        return;
    }

    try {
        const { data, error } = await supabaseClient
            .from('projects')
            .select('*')
            .eq('id', projectId)
            .single();

        if (error) {
            if (error.code === 'PGRST116') {
                throw new Error("No record found in Supabase matching this project ID (" + projectId + "). Save the project first!");
            }
            throw error;
        }

        if (data) {
            // Restore state
            projectState.title = data.title;
            projectState.description = data.description;
            projectState.fontHeadings = data.font_headings;
            projectState.fontBody = data.font_body;
            projectState.blocks = data.blocks;

            // Sync input selectors
            document.getElementById("setting-title").value = projectState.title;
            document.getElementById("setting-desc").value = projectState.description;
            document.getElementById("setting-font-headings").value = projectState.fontHeadings;
            document.getElementById("setting-font-body").value = projectState.fontBody;

            saveDraft();
            renderCanvas();

            alert("Project successfully loaded from Supabase database!");
            document.getElementById("supabase-modal").style.display = "none";
        }
    } catch (e) {
        console.error("Supabase Load Error", e);
        alert("Failed to load project: " + e.message);
    } finally {
        loadBtn.disabled = false;
        loadBtn.innerHTML = originalHtml;
    }
}
