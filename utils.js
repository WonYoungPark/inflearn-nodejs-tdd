// 문자열을 파라미터로 받아서 첫번째 문자를 대문자로 치환한다.
function capitalize(str) {
  return str.charAt(0).toUpperCase() + str.slice(1);
}

// 모듈 등록
module.exports = {
    capitalize: capitalize
};