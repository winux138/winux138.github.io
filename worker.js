onmessage = function(e) {
    // je recois canvas.width et canvas.height
    console.log('Message reçu depuis le script principal.');
    width = e.data[0];
    height = e.data[1];

    // traitement
    width = width * Math.random();
    height = height * Math.random();

    // je renvois les coords random
    console.log('Envoi du message de retour au script principal');
    postMessage([width, height]);
  }