$(document).ready( function () {
    var lesInterv = [];
    
    var row = new Intervention(1, 'U00I701', 'Louvet', 'Hugo', 'Comment héberger plusieurs sites web sur un même hébergement mutualisé', 'Comment héberger plusieurs sites web sur un même hébergement mutualisé', '30/03/2020','Assigné');
    var row2 = new Intervention(2, 'U00I908', 'Louvet', 'Hugo', 'Comment créer un site web', 'Comment créer un site web', '30/03/2020','Terminé');
    var row3 = new Intervention(3, 'U00I876', 'Louvet', 'Hugo', "J'ai publié mon site mais la page « Félicitations » d'OVH s’affiche toujours", "J'ai publié mon site mais la page « Félicitations » d'OVH s’affiche toujours", '30/03/2020','Terminé');

    lesInterv.push(row);
    lesInterv.push(row2);
    lesInterv.push(row3);

    var lesLignes = document.getElementById('lesLignes');
    lesInterv.forEach(oneIntervention => {
        var newLigne = document.createElement('tr');

        var newCellNom = document.createElement('td');
        newCellNom.innerHTML = oneIntervention.id;
    
        var newCellPrenom = document.createElement('td');
        newCellPrenom.innerHTML = oneIntervention.userId;
    
        var newCellTitre = document.createElement('td');
        newCellTitre.innerHTML = oneIntervention.titre;
    
        var newCellDate = document.createElement('td');
        newCellDate.innerHTML = oneIntervention.status;
    
        newLigne.appendChild(newCellNom);
        newLigne.appendChild(newCellPrenom);
        newLigne.appendChild(newCellTitre);
        newLigne.appendChild(newCellDate);
    
        lesLignes.appendChild(newLigne)
    });

    $('#myTable').DataTable();
});