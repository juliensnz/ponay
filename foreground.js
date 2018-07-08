browser.runtime.onMessage.addListener((payload) => {
    document.querySelectorAll('.ponay-thumbnail').forEach((node) => {
        node.remove();
    });

    const wrapper = document.createElement('div');
    wrapper.className = 'ponay-thumbnail';

    const img = document.createElement('img');
    img.src = payload.data.image;
    wrapper.appendChild(img);
    var speech = new SpeechSynthesisUtterance(payload.data.title);
    window.speechSynthesis.speak(speech);

    document.body.appendChild(wrapper);
});
