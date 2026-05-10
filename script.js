// ===== Service: スクロールアニメーション =====
const items = document.querySelectorAll(".service-item");

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) entry.target.classList.add("show");
    });
}, { threshold: 0.3 });

items.forEach(item => observer.observe(item));


// ===== Works データ =====
const worksData = [
    {
        img: "img/img1.png",
        title: "SaaSスタートアップ LP制作",
        goal: "サービスローンチに向けた初期顧客獲得",
        problem: "・サービスの魅力が伝わりにくい・公開スピードが求められていた",
        measure: "・最短設計で構成を最適化・ファーストビューで価値訴求を明確化",
        result: "・公開まで 14日・CVR 1.9倍向上・初月でリード100件獲得"
    },
    {
        img: "img/img2.png",
        title: "IT企業 コーポレートサイトリニューアル",
        goal: "信頼性向上と営業効率の改善",
        problem: "・情報が整理されていない・営業時の説明負担が大きい",
        measure: "・情報設計の再構築・サービス導線の最適化",
        result: "・問い合わせ数 2.5倍・商談化率アップ・制作期間 3週間"
    },
    {
        img: "img/img3.png",
        title: "スタートアップ 採用サイト制作",
        goal: "エンジニア採用強化",
        problem: "・応募数不足・企業の魅力が伝わっていない",
        measure: "・カルチャー重視のコンテンツ設計・UI/UX改善による回遊率向上",
        result: "・応募数 約2倍・ミスマッチ減少・制作期間 18日"
    },
    {
        img: "img/img4.png",
        title: "アパレルECサイト UI改善",
        goal: "売上向上と離脱防止",
        problem: "・購入フローが複雑・カート離脱が多い",
        measure: "・導線の簡略化・CTA配置の最適化",
        result: "・CVR 1.6倍・売上増加・改善期間 2週間"
    },
];

const imageTotalNumber = worksData.length;

// ===== Works: 要素取得 =====
const worksDisplayEl = document.getElementById("worksDisplay");
const imageListElement = document.getElementById("imageList");

// ボタン（デスクトップ用・SP用の両方）
const prevBtnDesktop = document.getElementById("prevImageDesktop");
const nextBtnDesktop = document.getElementById("nextImageDesktop");
const prevBtn = document.getElementById("prevImageSp");
const nextBtn = document.getElementById("nextImageSp");
const slideNumberEl = document.getElementById("currentSlideNumber");

let currentIndex = 0;

// ===== デスクトップ用: worksDisplay内にimg+textcontentを生成 =====
const desktopImg = document.createElement("img");
desktopImg.id = "worksImg";

const desktopText = document.createElement("div");
desktopText.className = "textcontent";
desktopText.innerHTML = `
    <p class="title"></p>
    <p class="goal"></p>
    <p class="problem"></p>
    <p class="measure"></p>
    <p class="result"></p>
`;

worksDisplayEl.appendChild(desktopImg);
worksDisplayEl.appendChild(desktopText);

// ===== SP用: works__slide カードを生成 =====
worksData.forEach((data) => {
    const slide = document.createElement("div");
    slide.className = "works__slide";

    const img = document.createElement("img");
    img.src = data.img;
    img.alt = data.title;

    const tc = document.createElement("div");
    tc.className = "textcontent";
    tc.innerHTML = `
        <p class="title">${data.title}</p>
        <p class="goal">${data.goal}</p>
        <p class="problem">${data.problem}</p>
        <p class="measure">${data.measure}</p>
        <p class="result">${data.result}</p>
    `;

    slide.appendChild(img);
    slide.appendChild(tc);
    worksDisplayEl.appendChild(slide);
});

// ===== サムネ生成 =====
for (let i = 0; i < imageTotalNumber; i++) {
    const li = document.createElement("li");
    li.style.backgroundImage = `url(${worksData[i].img})`;
    li.addEventListener("click", () => goTo(i));
    imageListElement.appendChild(li);
}

// ===== 状態更新: デスクトップ表示 + ボタン + 番号を一括更新 =====
function updateButtonStates(index) {
    // SP用ボタン
    prevBtn.classList.toggle("inActive", index === 0);
    nextBtn.classList.toggle("inActive", index === imageTotalNumber - 1);
    // デスクトップ用ボタン
    prevBtnDesktop.classList.toggle("inActive", index === 0);
    nextBtnDesktop.classList.toggle("inActive", index === imageTotalNumber - 1);
    // 番号
    slideNumberEl.textContent = `${index + 1} / ${imageTotalNumber}`;
}

function goTo(index) {
    currentIndex = index;
    const data = worksData[index];

    // デスクトップ用img・textcontent更新
    desktopImg.src = data.img;
    desktopText.querySelector(".title").textContent = data.title;
    desktopText.querySelector(".goal").textContent = data.goal;
    desktopText.querySelector(".problem").textContent = data.problem;
    desktopText.querySelector(".measure").textContent = data.measure;
    desktopText.querySelector(".result").textContent = data.result;

    // SPスライドをスクロール
    const slides = worksDisplayEl.querySelectorAll(".works__slide");
    if (slides[index]) {
        worksDisplayEl.scrollTo({ left: slides[index].offsetLeft, behavior: "smooth" });
    }

    updateButtonStates(index);
}

// 初期表示
goTo(0);

// ===== ボタンイベント（SP用） =====
prevBtn.addEventListener("click", () => {
    if (currentIndex > 0) goTo(currentIndex - 1);
});
nextBtn.addEventListener("click", () => {
    if (currentIndex < imageTotalNumber - 1) goTo(currentIndex + 1);
});

// ===== ボタンイベント（デスクトップ用） =====
prevBtnDesktop.addEventListener("click", () => {
    if (currentIndex > 0) goTo(currentIndex - 1);
});
nextBtnDesktop.addEventListener("click", () => {
    if (currentIndex < imageTotalNumber - 1) goTo(currentIndex + 1);
});

// ===== SP: 手動スクロールで番号・ボタン同期 =====
let scrollTimer;
worksDisplayEl.addEventListener("scroll", () => {
    clearTimeout(scrollTimer);
    scrollTimer = setTimeout(() => {
        const slides = worksDisplayEl.querySelectorAll(".works__slide");
        if (slides.length === 0) return;
        const scrollLeft = worksDisplayEl.scrollLeft;
        let closest = 0;
        let minDist = Infinity;
        slides.forEach((slide, i) => {
            const dist = Math.abs(slide.offsetLeft - scrollLeft);
            if (dist < minDist) { minDist = dist; closest = i; }
        });
        if (currentIndex !== closest) {
            currentIndex = closest;
            updateButtonStates(currentIndex);
        }
    }, 50);
});


// ===== アコーディオン =====
const faqItems = document.querySelectorAll(".faq__item");

faqItems.forEach(item => {
    const btn = item.querySelector(".faq__question");
    const content = item.querySelector(".faq__answer");

    btn.addEventListener("click", () => {
        faqItems.forEach(el => {
            if (el !== item) {
                el.classList.remove("active");
                el.querySelector(".faq__answer").style.maxHeight = null;
                el.querySelector(".faq__question").setAttribute("aria-expanded", "false");
            }
        });
        item.classList.toggle("active");
        if (item.classList.contains("active")) {
            content.style.maxHeight = content.scrollHeight + "px";
            btn.setAttribute("aria-expanded", "true");
        } else {
            content.style.maxHeight = null;
            btn.setAttribute("aria-expanded", "false");
        }
    });
});

const secondObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) entry.target.classList.add("show");
    });
}, { threshold: 0.3 });

faqItems.forEach(item => secondObserver.observe(item));


// ===== コンタクトフォーム =====
const form = document.querySelector(".contact__form");
const inputs = form.querySelectorAll(".contact__input, .contact__textarea");
const success = document.querySelector(".contact__success");

form.addEventListener("submit", (e) => {
    e.preventDefault();
    let isValid = true;
    success.textContent = "";

    inputs.forEach(input => {
        const error = input.nextElementSibling;
        input.classList.remove("error-input");
        error.textContent = "";

        if (input.value.trim() === "") {
            error.textContent = "必須項目です";
            input.classList.add("error-input");
            isValid = false;
            return;
        }
        if (input.name === "email") {
            const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            if (!emailPattern.test(input.value)) {
                error.textContent = "正しいメールアドレスを入力してください";
                input.classList.add("error-input");
                isValid = false;
            }
        }
    });

    if (isValid) {
        success.textContent = "送信が完了しました！（※デモです）";
        form.reset();
    }
});


// ===== バーガーメニュー =====
const burger = document.querySelector(".burger");
const drawer = document.querySelector(".nav__drawer");
const overlay = document.querySelector(".nav__overlay");

function openMenu() {
    burger.classList.add("is-open");
    burger.setAttribute("aria-expanded", "true");
    drawer.classList.add("is-open");
    drawer.setAttribute("aria-hidden", "false");
    overlay.classList.add("is-open");
    document.body.classList.add("is-menu-open");
}

function closeMenu() {
    burger.classList.remove("is-open");
    burger.setAttribute("aria-expanded", "false");
    drawer.classList.remove("is-open");
    drawer.setAttribute("aria-hidden", "true");
    overlay.classList.remove("is-open");
    document.body.classList.remove("is-menu-open");
}

burger.addEventListener("click", () => {
    burger.classList.contains("is-open") ? closeMenu() : openMenu();
});

overlay.addEventListener("click", closeMenu);
drawer.querySelectorAll(".nav__link").forEach(link => link.addEventListener("click", closeMenu));