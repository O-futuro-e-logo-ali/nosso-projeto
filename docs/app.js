const container = query('.container');
const queryA = query('header section ul li a', true);
const mainSections = query('.container main section', true);
const sectionsTop = [];
const aInstagram = query('.container footer div div .inline a');
const secElems = query('.container main section', true);

aInstagram.addEventListener('click', event => {
    event.preventDefault();
    window.open(event.target.href);
}, false);

mainSections.forEach(mainS => {
    sectionsTop.push(mainS.offsetTop);
});

container.addEventListener('scroll', event => {
    const containerTop = event.target.scrollTop;
    let filtredSection = mainSections[0];
    sectionsTop.forEach((top, n) => {
        if (top > containerTop) return;
        if (filtredSection.offsetTop < top) filtredSection = mainSections[n];
    });
    const filtredA = query(`header section ul li a[class=${filtredSection.id}]`);
    toggleActive(filtredA, filtredSection);
}, false);

function toggleActive(qA) {
    const aClass = qA.className;
    queryA.forEach((a, n) => {
        const liElem = query(`header section ul li:nth-child(${n + 1})`);
        const secElem = secElems[n];
        if (!a.className.includes(aClass)) {
            if (liElem.className.includes('active')) {
                liElem.classList.remove('active');
                secElem.classList.remove('active');
            };
        } else if (!liElem.className.includes('active')) {
            liElem.classList.add('active');
            secElem.classList.add('active');
        };
    });
};

function query(elem, all = false) {
    return document[`querySelector${all ? 'All' : ''}`](elem);
};