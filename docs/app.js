const container = query('.container');
const queryLi = query('header section ul li', true);
const mainSections = query('.container main section', true);
const sectionsTop = [];
const aInstagram = query('.container footer div div .inline a');
const secElems = query('.container main section', true);

aInstagram.addEventListener('click', event => {
    event.preventDefault();
    window.open(event.target.href);
}, false);

mainSections.forEach(mainS => {
    sectionsTop.push(mainS.offsetTop - (container.clientHeight / 2 - mainS.offsetHeight / 2));
});

queryLi.forEach((qLi, n) => {
    qLi.addEventListener('click', event => {
        event.preventDefault();
        const reqID = event.target.className;
        let filtredSection;
        mainSections.forEach(sec => {
            if (sec.id == reqID) filtredSection = sec;
        });
        container.scrollTo(
            container.scrollLeft,
            filtredSection.offsetTop - (container.clientHeight / 2 - filtredSection.offsetHeight / 2)
        );
    }, false);
});

let actual = 0, count = 50;
container.addEventListener('scroll', event => {
    const containerTop = event.target.scrollTop;
    const pageHeight = event.target.clientHeight;
    let filtredSection = mainSections[0];
    sectionsTop.forEach((top, n) => {
        if (top > containerTop) return;
        if (filtredSection.offsetTop < top) filtredSection = mainSections[n];
    });
    if (pos(containerTop - actual) > count) {
        actual = containerTop;
        // console.log(containerTop);
    };
    const filtredLi = query(`header section ul li.${filtredSection.id}`);
    toggleActive(filtredLi);
}, false);

container.scrollTo(0, 1);

function pos(n) {
    return n < 0 ? -n : n;
};

function toggleActive(qLi) {
    const liClass = qLi.className;
    queryLi.forEach((li, n) => {
        const secElem = secElems[n];
        if (!li.className.includes(liClass)) {
            if (li.className.includes('active')) {
                li.classList.remove('active');
                secElem.classList.remove('active');
            };
        } else if (!li.className.includes('active')) {
            li.classList.add('active');
            secElem.classList.add('active');
        };
    });
};

function query(elem, all = false) {
    return document[`querySelector${all ? 'All' : ''}`](elem);
};