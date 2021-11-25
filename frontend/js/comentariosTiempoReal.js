    // Import the functions you need from the SDKs you need
    import { initializeApp } from "https://www.gstatic.com/firebasejs/9.5.0/firebase-app.js";
    import { getDatabase, set, get, onValue, ref, child, update, remove } from "https://www.gstatic.com/firebasejs/9.5.0/firebase-database.js";
    // TODO: Add SDKs for Firebase products that you want to use
    // https://firebase.google.com/docs/web/setup#available-libraries
    
    // Your web app's Firebase configuration
    const firebaseConfig = {
      apiKey: "AIzaSyAsUlisf5yn5dq8_T99fLEQU1Hbkk0AK-k",
      authDomain: "fir-php-test-d5d57.firebaseapp.com",
      databaseURL: "https://fir-php-test-d5d57-default-rtdb.firebaseio.com/",
      projectId: "fir-php-test-d5d57",
      storageBucket: "fir-php-test-d5d57.appspot.com",
      messagingSenderId: "486658166814",
      appId: "1:486658166814:web:ca7a7e3ba7930298095e0f"
    };
    
    // Initialize Firebase
    const app = initializeApp(firebaseConfig);
    const db = getDatabase();
    const dbref = ref(db, "categorias");
    var random;
    var reff = ref(db);
    var param1;
    var param2;

    get(child(reff, "categorias")).then((snapshot)=>{
        var filtro = [];
        random = snapshot.val();
        for(let fil in random){
            filtro.push(fil);
        }
    });
    
    onValue(ref(db, "categorias/-Mo4dVVEc9pSiIzmxIf5/propuestas/0"), (snapshot) => {
        param1 = sessionStorage.getItem('param1');
        param2 = sessionStorage.getItem('param2');
        if(param1 != null & param2 != null){
            console.log("Parametro1: ", param1);
            console.log("Parametro2: ", param2);
        }
    });
    

