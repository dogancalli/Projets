# Projets

1]pour utiliser l'api via un autre site que jobboard, il vous faut changer les entêtes de chaques pages présentes dans le sous-dossier /dogan_api/api il suffit de supprimer le chemin du header et le remplacer par * ou le nom de votre site

2]pour utiliser la base de donnée il faut l'importer via le fichier .sql n'oubliez pas de changer la configuration de connexion dans le fichier présent ici => /dogan_api/config/Database.php

3]si vous changez le nom du dossier n'oublier surtout pas de le faire chaque fois qu'il sera présent dans les lignes de codes(au moins dans les headers de l'api)

4]si vous souhaitez récupérer les CV des candidats dans un dossier personnel n'oubliez pas de changer le chemin dans le fichier /dogan_api/api/Candidatures/upload_file.php ligne 8
et dans le fichier /script/add.js ligne 78
