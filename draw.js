document.addEventListener("DOMContentLoaded",function(){
    const svg=d3.select("#draw");
    svg.style("height",window.innerHeight);
    svg.style("width",window.innerWidth);
    let points=[]
    let lines=[]
    let draw=false;
    
    svg.on("mousedown",function(){
        draw=true;
        const coord=d3.mouse(this);
        draw_point(coord[0],coord[1],false)
    });
    svg.on("mouseup",function(){
        draw=false;
    });
    svg.on("mousemove",function(){
        const coord=d3.mouse(this);
        if(draw===false){
            return
        }else{
            draw_point(coord[0],coord[1],true)
        }
    });
    function draw_point(x,y,connect){
        const thickness=document.querySelector("#thickness-picker").value;
        const color=document.querySelector("#color-picker").value;
        const dot=svg.append("circle")
            .attr("cx",x)
            .attr("cy",y)
            .attr("r",thickness)
            .style("fill",color)
        points.push(dot)
        if(connect){
            const last_point=points[points.length-2]
            const line=svg.append("line")
                        .attr("x1",last_point.attr("cx"))
                        .attr("y1",last_point.attr("cy"))
                        .attr("x2",x)
                        .attr("y2",y)
                        .attr("stroke-width",thickness*2)
                        .style("stroke",color)
            lines.push(line)
        }
    }
    document.querySelector("#erase").addEventListener("click",function(){
        for(var i=0;i<points.length;i++){
            points[i].remove()
        }for(var i=0;i<lines.length;i++){
            lines[i].remove()
        }
    })
})