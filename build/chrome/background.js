chrome.runtime.onMessage.addListener(function (request, sender, sendResponse) {
    function sendSpritesBack() {
        var character = character_map[request.character],
            sprites = [],
            spoilers = [],
            lista = JSON.parse(this.response);

        if (character == 'monomi')
            sprites = sprites.concat(lista.usami);

        sprites = sprites.concat(lista[character]);

        spoilers = spoilers.concat(lista[character + '_spoiler']);

        sendResponse({
            sprites: sprites,
            spoilers: spoilers
        });
    }

    var character_map = {
        'Aoi': 'asahina',
        'Byakuya': 'togami',
        'Celes': 'celes',
        'Fujisaki': 'fujisaki',
        'Hagakure': 'hagakure',
        'Hifumi': 'yamada',
        'Ishimaru': 'ishimaru',
        'Junko': 'monokuma',
        'Kyouko': 'kirigiri',
        'Leon': 'kuwata',
        'Maizono': 'maizono',
        'Mondo': 'oowada',
        'Monokuma': 'monokuma',
        'Monomi': 'monomi',
        'Naegi': 'naegi',
        'Sakura': 'oogami',
        'Touko': 'fukawa',
        'Ikusaba': 'ikusaba',
        'Akane': 'owari',
        'Gundam': 'tanaka',
        'Hanamura': 'hanamura',
        'Hinata': 'hinata',
        'Ibuki': 'mioda',
        'Koizumi': 'koizumi',
        'Kuzuryuu': 'kuzuryuu',
        'Nagito': 'komaeda',
        'Nanami': 'nanami',
        'Nidaii': 'nidai',
        'Pekoyama': 'pekoyama',
        'Saionji': 'saionji',
        'Sonia': 'sonia',
        'Souda': 'souda',
        'Togami': 'twogami',
        'Tsumiki': 'tsumiki'
    };

    var req = new XMLHttpRequest();
    req.open('GET', 'sprites.json', true);
    req.onload = sendSpritesBack;
    req.send();

    return true;
});