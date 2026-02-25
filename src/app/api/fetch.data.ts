/*
 * @Author: Vivek J vsjaiswal@outlook.com
 * @Date: 2026-02-25 13:33:57
 * @LastEditors: Vivek J vsjaiswal@outlook.com
 * @LastEditTime: 2026-02-25 13:34:02
 * @FilePath: /gapps/src/app/api/fetch.data.ts
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 */

async function fetchData(url: string): Promise<any> {
  return fetch(url)
    .then((response) => {
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      return response.json();
    })
    .catch((error) => {
      console.error("Error fetching data:", error);
      throw error;
    });
}

export default fetchData;
// https://script.google.com/macros/s/AKfycbwDmLoYz8Ca1icqVVn4874ultLjyRGsLYuhWUm5uMdY4LTNyXfLXNskCjahKgNyPibG/exec
