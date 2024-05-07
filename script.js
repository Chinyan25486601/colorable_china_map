const coastline_IDs = [
    "g264",     // Guangdong
    "g325",     // Guangxi
    "g1437",    // Taiwan
    "g114",     // Fujian
    "g1694",    // Zhejiang
    "g972",     // Liaoning
]

let node_list = []

let refresh_map = function(){}

const loadSVG = function(){
    const container = document.getElementById("svgContainer")
    container.innerHTML = svgData
}

const main = function(){
    const gs = document.querySelectorAll("*>svg>g>g>g")
    const textarea = document.querySelector("textarea")
    gs.forEach(el=>{
        const id = el.getAttribute("id")

        if(coastline_IDs.indexOf(id)!==-1){
            el.setAttribute("pointer-events", "none")
        }

        el.addEventListener("click", event=>{
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

    refresh_map = function(){
        node_list.forEach(n=>{
            const id = n[0]
            const children = document.querySelectorAll(`#${id} *`)
            children.forEach(e=>{
                e.setAttribute("fill", `#fff`)
            })
            delete n;
        })
        if(!textarea.value.trim()) return
        node_list = JSON.parse(textarea.value)
        node_list.forEach(n=>{
            const id = n[0]
            const children = document.querySelectorAll(`#${id} *`)
            children.forEach(e=>{
                e.setAttribute("fill", `#${color_list[n[1]]}`)
            })
        })
    }

    textarea.addEventListener("change", refresh_map)
}

document.addEventListener("DOMContentLoaded", ()=>{
    loadSVG()
    main()
})