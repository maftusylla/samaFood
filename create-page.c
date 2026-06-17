#include <stdio.h>
#include <stdlib.h>
#include <string.h>
#include <sys/stat.h>
#include <sys/types.h>

#define MAX_PATH 512
#define MAX_LINE 1024

// Fonction pour créer les dossiers parents si nécessaires (équivalent de mkdir -p)
void create_directory(const char *path) {
    char tmp[MAX_PATH];
    char *p = NULL;
    size_t len;

    snprintf(tmp, sizeof(tmp), "%s", path);
    len = strlen(tmp);
    if (tmp[len - 1] == '/') tmp[len - 1] = 0;
    
    for (p = tmp + 1; *p; p++) {
        if (*p == '/') {
            *p = 0;
            mkdir(tmp, 0755);
            *p = '/';
        }
    }
    mkdir(tmp, 0755);
}

int main(int argc, char *argv[]) {
    // 1. Vérification de l'argument
    if (argc < 2) {
        fprintf(stderr, "usage: %s nomPage\n", argv[0]);
        return 1;
    }

    const char *page_name = argv[1];
    char page_dir[MAX_PATH];
    // On double la taille ici pour éviter le warning de troncature de GCC
    char js_file[MAX_PATH * 2]; 
    const char *route_file = "src/router/router.js";
    const char *temp_file = "src/router/router.tmp";

    snprintf(page_dir, sizeof(page_dir), "src/pages/%s", page_name);
    snprintf(js_file, sizeof(js_file), "%s/%s.js", page_dir, page_name);

    // 2. Création du dossier de la page
    create_directory(page_dir);

    // 3. Création du fichier JS de la page
    FILE *f_js = fopen(js_file, "w");
    if (f_js == NULL) {
        perror("Erreur lors de la création du fichier JS");
        return 1;
    }
    fprintf(f_js, "export function %s(){\n", page_name);
    fprintf(f_js, "    return `\n");
    fprintf(f_js, "       <h2>BIENVENUE SUR LA PAGE TEST %s</h2>\n", page_name);
    fprintf(f_js, "`;\n");
    fprintf(f_js, "}\n");
    fclose(f_js);
    printf("page créée : %s\n", js_file);

    // 4. Ajout de la route dans router.js de manière sécurisée
    FILE *f_in = fopen(route_file, "r");
    if (f_in == NULL) {
        fprintf(stderr, "Erreur : Le fichier %s n'existe pas\n", route_file);
        return 1;
    }

    FILE *f_out = fopen(temp_file, "w");
    if (f_out == NULL) {
        perror("Erreur lors de la création du fichier temporaire");
        fclose(f_in);
        return 1;
    }

    char line[MAX_LINE];
    int inside_routes_block = 0;
    int route_inserted = 0;

    // Lecture ligne par ligne de router.js
    while (fgets(line, sizeof(line), f_in)) {
        // Détection du début de la constante routes
        if (strstr(line, "const routes = {") != NULL) {
            inside_routes_block = 1;
        }

        // Si on est dans le bloc et qu'on trouve l'accolade fermante };
        if (inside_routes_block && !route_inserted && strncmp(line, "};", 2) == 0) {
            // Insertion de la nouvelle route avec indentation et virgule
            fprintf(f_out, "  '/%s': '../pages/%s/%s.js',\n", page_name, page_name, page_name);
            route_inserted = 1;
            inside_routes_block = 0; // Sortie du bloc ciblé
        }

        // Écriture de la ligne d'origine
        fputs(line, f_out);
    }

    fclose(f_in);
    fclose(f_out);

    // Remplacement du fichier original par le fichier modifié
    if (rename(temp_file, route_file) != 0) {
        perror("Erreur lors de la mise à jour de router.js");
        return 1;
    }

    printf("Route ajoutée dans %s\n", route_file);
    return 0;
}
