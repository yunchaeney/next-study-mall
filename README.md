## 쇼핑몰

Codeit 의 Next.js 강의를 수강하며 제작하였습니다.

1. Pages Route / module.css 를 사용
2. codeit에서 제공된 API 사용
3. 강의는 js 기준이었으나, typescript 를 추가로 적용함

App route 방식을 먼저 학습하였으나 기존의 Page route 방식 역시 아직 사용되고 있으므로 학습의 필요성을 느낌

### Pre-rendering

- 웹 브라우저가 페이지를 로딩하기 이전에 렌더링 하는 것.
- 프리렌더링 시 페이지의 로딩 속도가 빠르며, SEO 최적화에 도움이 됨.

- 정적 생성 (Static Generation)
  : 빌드 시에 html을 생성하는 것으로, 기본적으로 Next.js에서는 모든 페이지를 정적 생성
  : 데이터를 미리 렌더링 하고 싶다면 getStaticProps() 를 사용하여 **빌드 시에** html이 데이터를 포함하여 정적 생성 되도록 함
  : Build 시에 생성되기 때문에, 데이터의 업데이트가 잦다면 사용 X

- Server-side rendering
  : 리퀘스트가 들어올 때마다 서버에서 페이지를 렌더링
  : 항상 최신 데이터를 보여 줘야 하는 경우, 데이터가 자주 바뀌는 경우, 리퀘스트의 데이터를 사용해야 하는 경우 (예: 헤더, 쿼리스트링, 쿠키 등) 에 사용
