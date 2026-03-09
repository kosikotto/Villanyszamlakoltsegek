⚡ Energia-költség Kalkulátor (Full-Stack Projekt)

Ez a projekt egy webes alkalmazás, amely éves és havi bontású fogyasztási adatok alapján számol energiaköltségeket, figyelembe véve egyedi kedvezményrendszereket is. A projekt célja a Docker-alapú konténerizáció és a saját szerveren történő hostolás (On-premise) gyakorlati megvalósítása volt.

***

💡 Technológiai megközelítés & Tanulságok

Bár a frontend Vanilla HTML/JS alapokon nyugszik, a projekt igazi ereje a háttérben rejlik. A fejlesztés során a legnagyobb kihívást és tanulási pontot az infrastruktúra felépítése jelentette:

Docker & Docker Compose: A frontend és a backend külön konténerekben fut, így biztosítva a hordozhatóságot.

Network & Security: Saját szerveren üzemeltetve (Apache2 alatt) megtanultam a Reverse Proxy beállításokat, az SSL titkosítás megvalósítását, és azt, hogyan kommunikálhat egy HTTPS-en futó frontend egy HTTP-s Docker-backenddel.

***

📊 Funkciók

Mátrix-alapú adatbevitel: Havi és éves adatok kezelése CSV-szerű formátumban.

Intelligens Kedvezményrendszer: Ha két egymást követő évben a költség meghaladja a 350.000 Ft-ot, a rendszer a következő évre automatikusan 13%-os kedvezményt számol, amit vizuálisan (kiemeléssel és csillaggal) is jelez.

Reszponzív Táblázatok: Mobilon a táblázat nem "összemegy", hanem oszlopokba rendeződik, így kisebb kijelzőkön is olvasható marad.

***

🛠️ Telepítés és futtatás (Docker)

A projekt futtatásához elengedhetetlen a Docker és a Docker Compose megléte a számítógépeden. Amennyiben ezek még nincsenek telepítve, a hivatalos oldalon találod meg a telepítési útmutatót minden operációs rendszerhez:

    https://www.docker.com/products/docker-desktop/

1. lépés: A Backend image felépítése - Navigálj a BACKEND/Villanyszamla_backend mappába:

       docker build -t villanyszamlakoltsegek-backend .

3. lépés: A Frontend image felépítése - Navigálj a FRONTEND/Villanyszamlakoltsegek mappába:

        docker build -t villanyszamlakoltsegek-frontend .

3. lépés: Konténerek indítása - Navigálj a DOCKER könyvtárba (ahol a docker-compose.yaml található):

        docker compose up

4. lépés: Megnyitás böngészőben - Az alkalmazás elérhető a következő címen:

       http://127.0.0.1:8081/
