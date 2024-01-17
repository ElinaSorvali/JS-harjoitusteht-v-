

function index() {
    const x = `<h2>Tervetuloa Vihreän Sormen verkkosivuille! <img src="kasvi7.png"></h2>
               <p>Uudellamaalla toimiva viherrakentamiseen erikoistunut yritys.</p>
               
               
                <div class="flip-box">
                <div class="flip-box-inner">
                    <div class="flip-box-front">
                    <h2></h2>
                    </div>
                    <div class="flip-box-back">
                    <h2></h2>
                    </div>
                </div>
                </div>
                </center>
               `;

    document.getElementById("sisältö").innerHTML = x;
}
    //tämä avaa index-funktion automaattisesti kun sivulle tullaan
    window.onload = function () {
        index();
    };

    function kuvia() {
        const x = `
        <!-- Slideshow container -->
        <div class="slideshow-container">
        
          <div class="mySlides fade">
            <div class="numbertext">1 / 4</div>
            <img src="img1.jpg" style="width:90%">
            <div class="text">Silta kansallispuistoon</div>
          </div>
        
          <div class="mySlides fade">
            <div class="numbertext">2 / 4</div>
            <img src="img2.jpg" style="width:90%">
            <div class="text">Tulppaanipolku</div>
          </div>
        
          <div class="mySlides fade">
            <div class="numbertext">3 / 4</div>
            <img src="img3.jpg" style="width:90%">
            <div class="text">Pihan entisöinti</div>
          </div>

          <div class="mySlides fade">
            <div class="numbertext">4 / 4</div>
            <img src="img4.jpg" style="width:90%">
            <div class="text">Tie kartanolle</div>
          </div>
        
          <!-- Next and previous buttons -->
          <a class="prev" onclick="plusSlides(-1)">&#10094;</a>
          <a class="next" onclick="plusSlides(1)">&#10095;</a>
        </div>
        <br>
        
        <!-- The dots/circles -->
        <div style="text-align:center">
          <span class="dot" onclick="currentSlide(1)"></span>
          <span class="dot" onclick="currentSlide(2)"></span>
          <span class="dot" onclick="currentSlide(3)"></span>
          <span class="dot" onclick="currentSlide(4)"></span>
        </div>

        
        `;

        document.getElementById("sisältö").innerHTML = x
        karuselli()
    }

    function tyontekijat() {
    var myJson = `[{"Nimi":"Essi Esimerkki","Erikoisala":"Maisemasuunnittelu","Toimialue":"Uusimaa","Puhelinnumero":"0501234567","Email":"essi.esimerkki@vihreasormi.fi"},
    {"Nimi":"Heikki Heikkinen","Erikoisala":"Puutarhasuunnittelu","Toimialue":"Itä-Uusimaa ja Loviisa","Puhelinnumero":"0503343323","Email":"heikki.heikkinen@vihreasormi.fi"},
    {"Nimi":"Leena Lissanen","Erikoisala":"Ympäristörakentaminen","Toimialue":"Etelä-Suomi","Puhelinnumero":"0508765456","Email":"leena.lissanen@vihreasormi.fi"},
    {"Nimi":"Martti Anteroinen","Erikoisala":"Hulevesien hallinta","Toimialue":"Uusimaa","Puhelinnumero":"0505643547","Email":"martti.anteroinen@vihreasormi.fi"},
    {"Nimi":"Miisa Sukkanen","Erikoisala":"Maisemasuunnittelu","Toimialue":"Uusimaa","Puhelinnumero":"0509822735","Email":"miisa.sukkanen@vihreasormi.fi"},
    {"Nimi":"Sanni Möttönen","Erikoisala":"Kastelujärjestelmät","Toimialue":"Etelä-Suomi","Puhelinnumero":"0505377656","Email":"sanni.möttönen@vihreasormi.fi"}]`;

    taulukko = JSON.parse(myJson);

    let sivutHtml = `<table style="margin-right: 20px;">
                        <tr>
                            <th>Nimi</th>
                            <th>Erikoisala</th>
                            <th>Toimialue</th>
                            <th>Puhelinnumero</th>
                            <th>Sähköposti</th>
                        </tr>
                        ${taulukko.map(tuote => {
                            return `<tr>
                                        <td>${tuote.Nimi}</td>
                                        <td>${tuote.Erikoisala}</td>
                                        <td>${tuote.Toimialue}</td>
                                        <td>${tuote.Puhelinnumero}</td>
                                        <td><a href="mailto:${tuote.Email}">${tuote.Email}</a></td>
                                    </tr>`;
                        }).join('')}
                    </table>`

                    document.getElementById("sisältö").innerHTML = sivutHtml

    }
    function muuta() {
        
        const x = `   
                <h2 id="pois">Kirjoita pin-koodi (1234)</h2>
                    <div id="pin-div">
                <input id="pin" placeholder="pin code" type="password" />
                <button class="button" onclick="checkPin()">Login</button>
            </div>
            
            <div class="hidden">
            <h2 id="oikein">Pin-koodisi oli oikein!</h2>
            <h2 id="otsikko">Salaisten tietojen otsikko!</h2>
            <p>
            Kauheasti salaista tietoa.</p>
            

            <button class="button" onclick="logOut()">Logout</button>
            </div>

            <p>Html-sivu pin-koodin kyselylle, jossa pin-koodi myös jää muistiin.</p>
            <button class="button" onclick="pinhtml()">Pin-koodi nro2</button>
        `;
        // Kirjota tähän että tutkitaan localstoragesta, jos ok, kutsu showelements
        document.getElementById("sisältö").innerHTML = x

    }
    function showElements() {
        var hiddenElements = document.getElementsByClassName("hidden")
                for (i=0; i< hiddenElements.length; i++){
                    hiddenElements[i].style.visibility = "visible" 
                document.getElementById("pin-div").style.visibility = "hidden"
            }
        }


    //Koitin vaikka mitä että pin-koodin tallennus toimisi, mutta vaikka pinkoodi löytyy sivun localStoragesta, se 
    //häviää aina kun klikkaa jollekin toiselle sivulle
    function pinkoodi() {
        const savedPin = localStorage.getItem("pinkoodi")
        if (savedPin != null && savedPin != undefined) {
            showElements()
            return;
        }
    }

        //pin-koodin tarkistus
        async function checkPin() {
            var pin = document.getElementById("pin").value 
            const response = await fetch("http://localhost:3000/api/getpin")


            const correctPin = await response.json()

            
            if (pin == correctPin) {
                //kirjoittaminen localstoreen
                localStorage.setItem("pinkoodi", pin)
                pinkoodi()
                // showElements()  
                //teksti ilmestyy 4 sek jälkeen
                document.getElementById("otsikko").style.visibility = "hidden"

                setTimeout(() => {
                    document.getElementById("otsikko").style.visibility = "visible"
                }, 4000)

                //teksti ilmestyy 4 sek ajaksi
                document.getElementById("oikein").style.visibility = "visible"

                setTimeout(() => {
                    document.getElementById("oikein").style.visibility = "hidden"
                }, 4000)

                //piilottaa otsikon
                document.getElementById("pois").style.visibility = "hidden"
     
            }
            else {
                alert("Väärä pin-koodi")
            }
            }
          
        //log out
        function logOut () {
            localStorage.clear()
            window.location.reload()
        }
            
    function openChat() {
        window.open('chat.html', '_blank');
    }
    let slideIndex = 1;

    function pinhtml() {
        window.open('pin.html', '_blank');
    }



    function showSlides(n) {
        let i;
        let slides = document.getElementsByClassName("mySlides");
        let dots = document.getElementsByClassName("dot");
        if (n > slides.length) {slideIndex = 1}
        if (n < 1) {slideIndex = slides.length}
        for (i = 0; i < slides.length; i++) {
            slides[i].style.display = "none";
        }
        for (i = 0; i < dots.length; i++) {
            dots[i].className = dots[i].className.replace(" active", "");
        }
        slides[slideIndex-1].style.display = "block";
        dots[slideIndex-1].className += " active";
        }

    function karuselli() {

        showSlides(slideIndex);
    }
        // Next/previous controls
        function plusSlides(n) {
        showSlides(slideIndex += n);
        }

        // Thumbnail image controls
        function currentSlide(n) {
        showSlides(slideIndex = n);
        }

        function getRandomTip() {
    const tips = [
        "Muista kastella kasvit säännöllisesti.",
        "Luo monipuolisia istutusalueita erilaisilla kasveilla.",
        "Käytä luonnonmukaisia lannoitteita viherrakennuksessa.",
        "Tutustu paikallisiin kasvilajeihin ennen istutuksia."
    ];

    const randomIndex = Math.floor(Math.random() * tips.length);
    return tips[randomIndex];
}

    

   

    