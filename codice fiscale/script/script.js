function calcola() {
    if (event) event.preventDefault(); // Previene il comportamento di submit del form

    let cognome = (document.getElementById('cognome').value).toLowerCase();
    let nome = (document.getElementById('nome').value).toLowerCase();
    let data = document.getElementById('data').value;
    let sesso = document.getElementById('sesso').value;
    let comune = document.getElementById('mySelect').value;
    
    
    

    

    if (cognome === '' || nome === ''  || data === '' || sesso === '') {
        alert('input errati');
        return;
    } else {
        let codiceFiscale = '';

        let cognomeCodice = calcoloCognome(cognome);
        let nomeCodice = calcoloNome(nome);
        let dataCodice = calcoloData(data, sesso);
        let comuneCodice = calcolaComune(comune);

        codiceFiscale += cognomeCodice;
        codiceFiscale += nomeCodice;
        codiceFiscale += dataCodice;
        codiceFiscale += comuneCodice;

        console.log('Codice parziale:', codiceFiscale);

        let checkDigit = calcolaCheck(codiceFiscale);
        codiceFiscale += checkDigit;

        console.log('Codice fiscale completo:', codiceFiscale);

        codiceFiscale = codiceFiscale.toUpperCase();
        document.getElementById('risposta').innerHTML = codiceFiscale
        
    }
}


function calcoloCognome(cognome) {

    let vocali = 'aeiou';
    let codice ='';

    let n = 0;

    for (let char of cognome) {

        if (n < 3) {
            if (!(vocali.includes(char))) {
                codice += char;
                n += 1;
            } 
        }
    }

    if (n != 3) {
            
        for (let char of cognome) {

            if (n < 3) {
                if ((vocali.includes(char))) {
                    codice += char;
                    n += 1;
                } 
            }
        }
    }

    if (n != 3) {
        codice += 'x';
           
    }

    return codice;
    


}




function calcoloNome(nome) {
    let vocali = 'aeiou';
    let codice='';

    let consonantiArray = [];

    for (let char of nome) {
        if (!vocali.includes(char)) {
            consonantiArray.push(char) ;
    }
    }

    if (consonantiArray.length >= 4) {
        codice += `${consonantiArray[0]}${consonantiArray[2]}${consonantiArray[3]}`;
        return codice;
    } else {
        return calcoloCognome(nome);
    }

    

}

function calcoloData(data, sesso) {
    let codice = '';
    codice += data.substring(2, 4);

    
    let mese = data.substring(5, 7);
    mese = (parseInt(mese)-1);
    let meseArray = ['a', 'b', 'c', 'd', 'e', 'h', 'l', 'm', 'p', 'r', 's', 't'];

    codice += meseArray[mese];

    if (sesso === 'm') {
        codice += data.substring(8, 10);
    } else {
        codice += ( parseInt(data.substring(8, 9)) + 40 );
    }

    return codice;
    
}


function showFile(input) {
    let testo="";
    let inputfile = input.files[0];   //input.files è un array perche' si possono selezionare più file. 
     
    alert(`File name: ${inputfile.name}`); // e.s comuni.txt
    alert(`Last modified: ${inputfile.lastModified}`); 
  
    if(inputfile){
      let reader = new FileReader();
     
      reader.readAsText(inputfile);       //inputfile è l'oggetto da leggere come testo
    
      reader.onload = function() {   //al termine del caricamento viene generato l'evento load
            testo=reader.result;   //prop. result di target dell'oggetto "e" mi consente di accedere al contenuto del file
           
            document.getElementById("out").value=testo;
           
            creaSelection(testo);
    }
  }
  }
  
function creaSelection(testo){
  
    let x = document.getElementById("mySelect");
    let option;
  
    let myArray = testo.split("\r\n");
    for(let i=0;i<myArray.length;i++){
        option = document.createElement("option");
        let testo = myArray[i];
        let comune = testo.slice(0, -5);
        let codice = testo.slice(-4);
        option.text = comune;
        option.value = codice;
        x.add(option);
   }
  }

  function calcolaComune(comune) {
    let codice = '';
    codice += comune;
    return codice;
    
  }


function calcolaCheck(codiceFiscale) {

    console.log(codiceFiscale);
    
    let alfabeto = 'abcdefghijklmnopqrstuvwxyz';
    alfabeto = alfabeto.split('');
    
    let arrayConversione = [1, 0, 5, 7, 9, 13, 15, 17, 19, 21, 2, 4, 18, 20, 11, 3, 6, 8, 12, 14, 16, 10, 22, 25, 24, 23];
    let somma = 0;
    let codice = '';

    let i = 0;

    for (char of codiceFiscale) {
        console.log(char);
        if (!isNaN(parseInt(char))) {
            char = alfabeto[parseInt(char)]
        }
        
        char = char.toLowerCase();
        char  = (char.charCodeAt(0) - 97);
        
        if ( i % 2 != 1) {
            char = arrayConversione[char];
            } 
        
        somma += (char);
        console.log("->" + char);
        //console.log(somma)
        i ++;
    }

    codice = somma % 26;
    codice += 97;
    codice = String.fromCharCode(codice);
    

    return codice;


    
}
