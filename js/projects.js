document.addEventListener("DOMContentLoaded", async () => {

    const projectsGrid = document.getElementById("projectsGrid");

    if (!projectsGrid) return;

    function escapeHTML(value) {
        const div = document.createElement("div");
        div.textContent = value ?? "";
        return div.innerHTML;
    }

    projectsGrid.innerHTML = `
        <div class="loading-projects">
            <span>Loading projects...</span>
        </div>
    `;

    try {

        const supabaseClient = window.supabase.createClient(
            window.TM_CONFIG.SUPABASE_URL,
            window.TM_CONFIG.SUPABASE_ANON_KEY
        );

        const {
            data,
            error
        } = await supabaseClient
            .from("projects")
            .select("*")
            .order("created_at", {
                ascending: false
            });

        if (error) {
            throw error;
        }

        if (!data || data.length === 0) {

            projectsGrid.innerHTML = `
                <div class="empty-projects">
                    <p>No projects available yet.</p>
                </div>
            `;

            return;
        }

        projectsGrid.innerHTML = "";

        data.forEach((project, index) => {

            const image = project.image_urls?.[0] || "";

            const card = document.createElement("article");

            card.className = "project-card";

            card.innerHTML = `
                ${
                    image
                        ? `
                            <img
                                class="project-image"
                                src="${escapeHTML(image)}"
                                alt="${escapeHTML(project.title)}"
                                loading="lazy"
                            >
                        `
                        : ""
                }

                <div class="project-overlay">

                    <p class="project-location">
                        ${escapeHTML(
                            project.location || "Sri Lanka"
                        )}
                    </p>

                    <h3>
                        ${escapeHTML(project.title)}
                    </h3>

                    <p>
                        ${escapeHTML(
                            project.description || ""
                        )}
                    </p>

                </div>
            `;

            projectsGrid.appendChild(card);

            setTimeout(() => {
                card.classList.add("show");
            }, 100 + index * 150);

        });

    } catch (error) {

        console.error("Projects loading error:", error);

        projectsGrid.innerHTML = `
            <div class="empty-projects">
                <p>
                    Unable to load projects.
                    Please try again later.
                </p>
            </div>
        `;
    }

});