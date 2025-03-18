# 뭐 먹을지 정해주는 조력자, 모먹조

![readme_mockup](https://github.com/Stageus/momeokjo-react/blob/master/public/redme-img.png)

- 배포 URL : 
- Test ID : 
- Test PW : 

<br>

## 프로젝트 소개

- 식사, 후식, 간식 메뉴가 고민되는 상황에 간단하게 음싣점 추천을 받아볼 수 잇는 플랫폼
- 프로그램의 지속성을 위해 관리자 집중이 아닌 사용자들의 참여로 이끌어 갈 수 있는 서비스
    - 신고와 신규 등록을 통한 덮어쓰기로 잘못 등록된 음식점에 대한 정보 관리
    - 본인이 잘못 작성한 음식점, 메뉴, 후기에 대한 수정으로 정보 관리

<br>

## 1. 개발 환경

- Front : HTML, React, styled-components, Recoil
- 버전 및 이슈관리 : Github
- 협업 툴 : Notion, Github 
<br>

## 2. 채택한 개발 기술과 브랜치 전략

### React, styled-component

- React
    - 컴포넌트화를 통한 유지보수와 재사용성 고려

- styled-component
    - props를 활용한 조건부 스타일링
    - S-dot 네이밍을 통해 일반 컴포넌트와 스타일드 컴포넌트 구분

    
### Recoil

- 전역으로 관리되는 State, 불필요한 props 구조 단순한 로직으로 관리


### Fsd Pattern

- Component의 상위 하위 개념을 폴더 구조로 표현
- 응집도의 장점인 재사용성, 테스트성을 가져가면서 폴더 구조를 통해 비즈니스 로직까지 챙길 것


### 브랜치 전략

- master, develop, feature 브랜치로 분리
    - master 브랜치 : 기준이 되는 브랜치로 제품을 배포하는 브랜치
    - develop 브랜치 : 개발 브랜치로 개발자들이 이 브랜치를 기준으로 각자 작업한 기능들을 Merge
    - feature 브랜치 : 단위 기능을 개발하는 브랜치로 기능 개발이 완료되면 develop 브랜치에 Merge

<br>

## 3. 프로젝트 구조

```
├── README.md
├── .eslint.config.js
├── .gitignore
├── .env
├── package-lock.json
├── package.json
│
├── public
│    └── 
└── src
     ├── main.jsx
     ├── app
     │     ├── assets
     │     │   ├── fonts
     │     │   style
     │     └── index.jsx
     ├── page
     │     ├── assets
     │     ├── ui
     │     │   ├── Detail
     │     │   │   KakaoMap
     │     │   │   Layout
     │     │   └── Login
     │     │   index.jsx
     │     │   style.js
     ├── shared
     │     ├── model
     │     │     ├── .jsx
     │     │     └── .jsx
     └── widget
           ├── assets
           │   model
           │   ui
           └── .jsx
```

<br>

## 4. 페이지별 기능

### [음식점추천]
- 

<br>

### [회원가입]
- 

<br>
