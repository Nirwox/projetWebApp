$(document).ready( function () {
    $("#formAdd").hide();

    var lesInterv = [];
    
    var row = new Intervention(0, 'U00I701', 'Louvet', 'Hugo', 'Comment héberger plusieurs sites web sur un même hébergement mutualisé', 'Comment héberger plusieurs sites web sur un même hébergement mutualisé', new Date(2020,3,30,18,30),'Assigné');
    var row2 = new Intervention(0, 'U00I908', 'Louvet', 'Hugo', 'Comment créer un site web', 'Comment créer un site web', new Date(2020,3,30,18,00),'Terminé');
    var row3 = new Intervention(0, 'U00I876', 'Louvet', 'Hugo', "J'ai publié mon site mais la page « Félicitations » d'OVH s’affiche toujours", "J'ai publié mon site mais la page « Félicitations » d'OVH s’affiche toujours", new Date(2020,3,30,20,30),'Terminé');
    row.setId(idAleatoire(row.date))
    row2.setId(idAleatoire(row2.date))
    row3.setId(idAleatoire(row3.date))

    lesInterv.push(row);
    lesInterv.push(row2);
    lesInterv.push(row3);

    reloadTable(lesInterv);

    $('#myTable').DataTable();
    $("#myTable_wrapper").addClass('margin30')

    $('#addInter').click(function() {
        $("#formAdd").show();
        $("#myTable_wrapper").hide();
    });

    $('#home').click(function() {
        $("#formAdd").hide();
        $("#myTable_wrapper").show();
    });

    $('#newInter').click(function() {
        var lInter = [];
        var titre = $('#titre').val();
        var desc = $('#desc').val();

        var row = new Intervention(0, 'U00I876', 'Louvet', 'Hugo', titre, desc, new Date(2020,3,30,23,30),'Non assigné');
        lInter.push(row)
        reloadTable(lInter)
        $("#formAdd").hide();
        $("#myTable_wrapper").show();
        var titre = $('#titre').val('');
        var desc = $('#desc').val('');
    })
});

function idAleatoire(date) {
    var str = "TICKET-"+ date.getTime();
    return str;
}

function reloadTable(lesInterv) {
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

        var newCellAction = document.createElement('td');
        newCellAction.classList.add('text-center')
        newCellAction.innerHTML = "<i class='fas fa-plus-circle'>";
    
        newLigne.appendChild(newCellNom);
        newLigne.appendChild(newCellPrenom);
        newLigne.appendChild(newCellTitre);
        newLigne.appendChild(newCellDate);
        newLigne.appendChild(newCellAction);
    
        lesLignes.appendChild(newLigne)
    });
}