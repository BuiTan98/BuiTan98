import html from '../core.js'
import { connect } from '../store.js'

const connector = connect() //  Xử lí html để xuất ra.

// Hàm này có tác dụng tạo ra HTML đã qua xử lí để chuẩn bị cho xuất ra.
function App({cars}) {
    return html`
       <ul>
            ${cars.map(car => `<li>${car}</li>`)}
       </ul>

       <button onclick="dispatch('ADD', 'Porsche')">Add car</button>
    `
}

export default connector(App)