// core.js Này là: Bộ xử lí trung tâm

// Tạo template View
export default function html([first, ...strings],...values) { // Hàm này gọi là template engine, hàm này xử lí một số lỗi linh tinh của html
    return values.reduce(
        (acc, cur) => acc.concat(cur, strings.shift()), // nối các mảng với nhau*
        [first]
    )
    .filter(x => x && x !== true || x === 0) // Lấy tất cả giá trị đúng ngoại trừ true và lấy thêm số 0.*
    .join('') // chuyển dữ liệu array sang dạng chuỗi*
  
}

// Tạo Store (cho khu lưu giữ liệu)*
export function createStore(reducer) { // Hàm này tạo ra dữ liệu trong store thông qua reducer và các thao tác trên view
    let state = reducer()
    const roots = new Map() // Object đặc biệt, có tính chất lặp qua, đặt tên key của nó bằng tất cả kiểu dữ liệu gì trong javascript*

    // render ra View*
    function render() {
        for (const [root, component] of roots) {
            const output = component()
            root.innerHTML = output
        }
    }
    
    return {
        // attach nhận cái view của các bạn và đẩy ra cái root*. Hàm này nhận mấy cái dòng HTML của component để hiển thị ra view
        attach(component, root) {
            roots.set(root, component) // đặt key là root, value là component*. Đối với obj thường thì gán luôn, nhưng với Map thì dùng phương thức set
            render()
        },
        // đẩy dữ liệu từ store vào view*
        connect(selector = state => state) {
             // props và args là một obj, nó là các key: value mà ta muốn đưa thêm vào store và đưa ra view
            return component => (props, ...args) =>
                component(Object.assign({}, props, selector(state), ...args)) // gộp tất cả các Object nhỏ và thành một Object lớn.
        },
        // View muốn thực hiện hành động thì sẽ dispatch*
        dispatch(action, ...args) {  // Hàm này có tác dụng gửi thông tin đến reducer để xử lí dư liệu trong store và cả render ra view
            state = reducer(state, action, args)
            render() 
        }

    }
}