(function (DR, document) {
    "use strict";

    if (document.title.toLowerCase().indexOf('class trial') == -1)
        return;

    function computeLocalTime(evt) {
        this.title = 'Right now it\'s '+ DR.roleList.getLocalTime(this.getAttribute('data-user')).toLocaleString() +' in their time zone.';
    }

    DR.addListener('rolesidentified', function (roles) {
        var t, tagline,
            taglines = document.querySelectorAll('.entry .tagline');

        var user, author, character, flair, offset;

        for (t = 0; tagline = taglines[t]; t++) {
            author = tagline.querySelector('.author');

            if (!author)
                continue;

            user = author.textContent;
            if (roles.exists(user)) {
                tagline.classList.add('drp-participant');

                author.insertBefore(document.createTextNode(' u/'), author.firstChild);

                character = document.createElement('strong');
                character.className = 'drp-charactername';
                character.textContent = DR.NAMES[roles.get(user)];

                author.insertBefore(character, author.firstChild);

                if (roles.hasTz(user)) {
                    offset = document.createElement('strong');
                    offset.className = 'drp-localtime';
                    offset.textContent = '[' + roles.getUTCLabel(user) + ']';
                    offset.setAttribute('data-user', user);
                    offset.addEventListener('mouseenter', computeLocalTime, true);

                    author.appendChild(offset);
                }

                flair = tagline.querySelector('.flair');
                if (flair) {
                    flair.className = 'flair';
                    flair.classList.add(DR.FLAIRS[roles.get(user)]);
                }
            }
        }
    });

})(window.DRreddit, document);