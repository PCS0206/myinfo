window.addEventListener('load', () => {

    // -------------------------------
    // Hero 텍스트/이미지 fade-in + 타자효과
    // -------------------------------
    const heroImg = document.querySelector('.hero img');
    const heroH1 = document.querySelector('.hero h1');
    const heroP = document.querySelector('.hero p');

    if(heroImg) heroImg.classList.add('show');
    if(heroH1) heroH1.classList.add('show');
    if(heroP) heroP.classList.add('show');

    function typeWriter(element, speed = 50) {
        const text = element.innerHTML;
        element.innerHTML = '';
        let i = 0;

        function typing() {
            if (i < text.length) {
                if (text[i] === '<') { // 태그 시작
                    let end = text.indexOf('>', i);
                    if (end !== -1) {
                        element.innerHTML += text.substring(i, end + 1);
                        i = end + 1;
                    }
                } else {
                    element.innerHTML += text[i];
                    i++;
                }
                setTimeout(typing, speed);
            }
        }

        typing();
    }

    if(heroP) typeWriter(heroP, 40);

    // -------------------------------
    // 섹션 fade-in
    // -------------------------------
    const fadeSections = document.querySelectorAll('.fade-section');
    const fadeObserver = new IntersectionObserver(entries => {
        entries.forEach(entry => {
            if(entry.isIntersecting){
                entry.target.classList.add('show');
            } else {
                entry.target.classList.remove('show');
            }
        });
    }, { threshold: 0.15 });

    fadeSections.forEach(section => fadeObserver.observe(section));

    // -------------------------------
    // Todo 리스트 fade-in
    // -------------------------------
    const todoItems = document.querySelectorAll('.todo-list li');
    const todoObserver = new IntersectionObserver(entries => {
        entries.forEach(entry => {
            if(entry.isIntersecting){
                entry.target.classList.add('show');
                todoObserver.unobserve(entry.target); // 한 번 나타나면 관찰 종료
            }
        });
    }, { threshold: 0.1 });

    todoItems.forEach(item => todoObserver.observe(item));

    // 기존 scroll delta 방식도 유지 가능 (선택 사항)
    const todoSection = document.getElementById('todo-section');
    let currentIndex = 0;
    let scrollDelta = 0;
    const scrollThreshold = 50;

    function showNextTodo() {
        if(currentIndex < todoItems.length){
            todoItems[currentIndex].classList.add('show');
            currentIndex++;
        }
    }

    function checkTodoSection() {
        const rect = todoSection.getBoundingClientRect();
        return rect.top < window.innerHeight && rect.bottom > 0;
    }

    window.addEventListener('wheel', e => {
        if(checkTodoSection() && e.deltaY > 0){
            scrollDelta += e.deltaY;
            if(scrollDelta >= scrollThreshold){
                showNextTodo();
                scrollDelta = 0;
            }
        }
    }, { passive: true });

    let lastTouchY = 0;
    window.addEventListener('touchstart', e => lastTouchY = e.touches[0].clientY, { passive: true });
    window.addEventListener('touchmove', e => {
        const currentY = e.touches[0].clientY;
        const deltaY = lastTouchY - currentY;
        lastTouchY = currentY;
        if(checkTodoSection() && deltaY > 0){
            scrollDelta += deltaY;
            if(scrollDelta >= scrollThreshold){
                showNextTodo();
                scrollDelta = 0;
            }
        }
    }, { passive: true });

    // -------------------------------
    // Hobby-list 등장 애니메이션
    // -------------------------------
    const hobbyBoxes = document.querySelectorAll('.hobby-box');
    const hobbyObserver = new IntersectionObserver(entries => {
        entries.forEach(entry => {
            if(entry.isIntersecting){
                entry.target.classList.add('show');
            }
        });
    }, { threshold: 0.1 });

    hobbyBoxes.forEach(box => hobbyObserver.observe(box));

    // -------------------------------
    // 버튼
    // -------------------------------
    const tarkovItem = document.querySelector('li#tarkov'); // li에 id="tarkov" 필요
    if(tarkovItem){
        tarkovItem.addEventListener('click', () => {
            alert("개똥망겜");
        });
    }
    if(Poutine){
        Poutine.addEventListener('click', () => {
            alert("아뇨아뇨. 러시아쪽 그 분 말고 캐나다 음식이에요.");
            window.open("https://namu.wiki/w/%ED%91%B8%ED%8B%B4(%EC%9A%94%EB%A6%AC)");
        });
    }

    if(firstcar){
        firstcar.addEventListener('click', () => {
            alert("Honda CIVIC");
        });
    }
});
