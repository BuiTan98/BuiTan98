const $ = document.querySelector.bind(document)
const $$ = document.querySelectorAll.bind(document)

const app = (() => {
    const cars = ['BMW'];
    
    const root = $('#root');
    const input = $('#input');
    const submit = $('#submit');

    return {
        add(car) {
            cars.push(car)
        },
        delete(index) {
            cars.splice(index,1)
        },
        render() {
            const html = cars.map((car,index) => `
                <li>
                    ${car}
                    <span class="delete" data-index="${index}">&times</span> 
                </li>
            `)
            .join('')
        
            root.innerHTML = html // gán biến html cho thẻ có id là root bên HTML
        },
        handleDelete(e) {
            const deleteBtn = e.target.closest('.delete') // trả về phần tử có class là delete (nút X) khi được bấm vào và gán cho biến deleteBtn.
            if(deleteBtn) {
                const index = deleteBtn.dataset.index // Lấy ra được biến ${index} của data-index
                this.delete(index)
                this.render()
            }
        },
        init() {
            // const _this = this; khi sử dụng function() {}
            // Handle DOM events
            submit.onclick = () => {  // Do Arrow function không có context nên nó sẽ lấy context của hàm bên ngoài lên dùng this như bình thường được.
                const car = input.value // Lấy dữ liệu được ghi vào của input và gán cho biến car.
                this.add(car)
                this.render()
                
                input.value = null; // reste lại input.
                input.focus(); // để trỏ chuột vào input.
            }

            root.onclick = this.handleDelete.bind(this) // khi bấm vào dấu X sẽ xóa oto đi.

            this.render()
        }
    }
})();

app.init()


