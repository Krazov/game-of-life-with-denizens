define({
    log: (...messages) => {
        console.log(...messages);

        return;
        document.querySelector('.messages-logs').appendChild(
            Object.assign(document.createElement('li'), {
                innerHTML: `${messages.join(' ')}`
            })
        );
    }
});