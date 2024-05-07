let node_list = []

const main = function(){
    const gs = document.querySelectorAll("*>svg>g>g>g")
    const textarea = document.querySelector("textarea")
    gs.forEach(el=>{
        el.addEventListener("click", event=>{
            const id = el.getAttribute("id")
            const children = document.querySelectorAll(`#${id} *`)
            
            let flag = false
            let el_key = 0
            let next_color = 0
            for(const key in node_list){
                if(node_list[key][0]==id){
                    flag=true
                    el_key = key
                    break
                }
            }
            if(flag){
                next_color = node_list[el_key][1]
                next_color++
                if(next_color>color_list.length-1) next_color-=color_list.length
                node_list[el_key][1] = next_color
            } else {
                next_color = 1
                node_list.push([id, 1])
            }

            children.forEach(e=>{
                e.setAttribute("fill", `#${color_list[next_color]}`)
            })

            textarea.value = JSON.stringify(node_list)
        })
    })

    textarea.addEventListener("change", event=>{
        node_list.forEach(n=>{
            const id = n[0]
            const children = document.querySelectorAll(`#${id} *`)
            children.forEach(e=>{
                e.setAttribute("fill", `#fff`)
            })
            delete n;
        })
        node_list = JSON.parse(textarea.value)
        node_list.forEach(n=>{
            const id = n[0]
            const children = document.querySelectorAll(`#${id} *`)
            children.forEach(e=>{
                e.setAttribute("fill", `#${color_list[n[1]]}`)
            })
        })
    })
}

document.addEventListener("DOMContentLoaded", main)