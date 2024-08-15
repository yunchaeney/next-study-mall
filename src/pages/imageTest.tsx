import Image from "next/image";

export default function test() {
  return (
    <>
      <h1>test Component</h1>

      {/* 이미지를 새탭으로 열어보면, img 는 /product.jpeg 가 나오고 Image 태그는
    _next/image?url=%2Fproduct.jpeg&w=128&q=75 이런 식의 url이 찍힌다
    크기도 작게 나온다 */}
      <img src="/product.jpeg" alt="test" width={120} height={120} />

      {/* 이미지 원본을 바로 쓰는 게 아니라 next 서버를 거친 최적화 이미지를 가져온다 */}
      <Image src="/product.jpeg" alt="test" width={120} height={120} />

      {/* 또한 화면에 바로 나오지 않고, Lazy loading을 한다
      처음부터 가져오는 게 아니라 필요한 순간에 가져오기 때문에 페이지 로딩 속도가 빨라진다 */}

      {/* 1. 이미지 크기 최적화 -> width 와 height 를 지정해 줘야 함 */}

      {/* 유연한 이미지 속성 fill - 부모 요소에 꽉 차게 들어감 */}
      <div style={{ position: "relative", width: "500px", height: "300px" }}>
        <Image
          src="/product.jpeg"
          alt="test"
          fill
          style={{ objectFit: "cover" }} //
        />
      </div>
    </>
  );
}
