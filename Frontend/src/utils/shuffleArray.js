export default function shuffleArray(array) {
  const newArr = [...array];

  for (let i = newArr.length - 1; i >= 0; i--) {
    const randomIndex = Math.floor(Math.random() * i);
    const temp = newArr[i];
    newArr[i] = newArr[randomIndex];
    newArr[randomIndex] = temp;
  }
  return newArr;
}
