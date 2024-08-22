# Mini Project - 쇼핑몰
이 프로젝트는 Codeit 강의 사이트의 NextJS 강의를 기반으로 제작하였습니다.
<br />
<br />
## 프로젝트 개요 및 특징
API를 활용하여 상품 리스트 및 상세 페이지를 노출, 상품에 대한 사이즈 리뷰를 추가할 수 있는 쇼핑몰 사이트

- **NextJS Pages Router** : Pages Router 사용 방법과 Pages Router 사용 시 Server Side Rendering 방식을 이해함을 목표하였습니다.

- **기술 스택 확장** : `Javascript`, `module.css` 를 사용한 강의 내용에 `Typescript` 와 `SCSS`를 적용하였습니다.
  - (관련 블로그 포스트 : [Next.js 에서 sass 사용하기 (+ Sass Option 알아보기, dirname 에러 해결하기)](https://velog.io/@chaeney/Next.js-%EC%97%90%EC%84%9C-sass-%EC%82%AC%EC%9A%A9%ED%95%98%EA%B8%B0-Sass-Option-%EC%95%8C%EC%95%84%EB%B3%B4%EA%B8%B0-dirname-%EC%97%90%EB%9F%AC-%ED%95%B4%EA%B2%B0%ED%95%98%EA%B8%B0)

- **디자인** : 강의에서 제공된 디자인을 일부 수정 및 추가하였습니다.

- **API** : 강의에서 제공된 API를 활용하여 상품 리스트 및 상세 페이지, 리뷰 리스트/추가 기능을 구현하였습니다.
<br />
<br />

## 확장 기능
- **장바구니 기능 추가**: 강의에 포함되지 않았던 장바구니 기능을 개발하여 사용자가 상품을 장바구니에 담을 수 있도록 하였습니다.
  - 장바구니에 상품 추가 시 Local Storage에 저장하여 탭을 껐다 켜도 상품이 유지되도록 함
  - 장바구니에서 개별 삭제, 전체 삭제, 상품 갯수 변경 등의 기능을 구현
  
- **테마모드 적용**: Dark Mode와 Light Mode를 설정할 수 있습니다.
  - SCSS의 variable, mixin 을 사용하여 테마에 대한 CSS 적용
  - 사용자의 OS 테마모드를 우선적으로 적용
  - 모드 변경 시 Session Storage에 저장하여 새로고침 시에 초기화를 방지
<br />
<br />

## 배포 
링크 : [Vercel](https://next-study-mall.vercel.app/)
<br />
<br />

---

## Pre-rendering

- 웹 브라우저가 페이지를 로딩하기 이전에 렌더링 하는 것.

- 프리렌더링 시 페이지의 로딩 속도가 빠르며, SEO 최적화에 도움이 됨.

- 정적 생성 (Static Generation)
  
  - 빌드 시에 html을 생성하는 것으로, 기본적으로 Next.js에서는 모든 페이지를 정적 생성<br />
  - 데이터를 미리 렌더링 하고 싶다면 getStaticProps() 를 사용하여 **빌드 시에** html이 데이터를 포함하여 정적 생성 되도록 함<br />
  - Build 시에 생성되기 때문에, 데이터의 업데이트가 잦다면 사용 X

- Server-side rendering
  - 리퀘스트가 들어올 때마다 서버에서 페이지를 렌더링
  - 항상 최신 데이터를 보여 줘야 하는 경우, 데이터가 자주 바뀌는 경우, 리퀘스트의 데이터를 사용해야 하는 경우 (예: 헤더, 쿼리스트링, 쿠키 등) 에 사용

## Pages Router vs App Router

1. React Server Component(RSC)

- 기존 방식에서는 클라이언트에서 요청을 보내 데이터를 받아오거나, Next.js 에서 프리렌더링을 하여 Props로 데이터를 전달하였으나, 리액트 서버 컴포넌트에서는 컴포넌트를 async/await 함수로 만들어 데이터를 받아올 수 있다.
  - 직관적인 문법, 서버에서 데이터를 가져온 후 렌더링 하여 보내기 때문에 서버와 클라이언트가 여러 번 리퀘스트를 주고받을 때보다 빠르게 페이지를 보여줄 수 있다.
  - 서버 컴포넌트 렌더링에 필요한 자바스크립트는 서버에서만 실행하기 때문에 클라이언트가 다운로드해야 할 자바스크립트 코드의 양이 줄어든다.

2.  공통 레이아웃 적용 방식, 메타데이터 적용 방식 등의 차이
