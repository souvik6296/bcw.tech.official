
function setItem() {

    $("document").ready(() => {


        const preview = document.getElementById("preview");




        const url = window.location.href;

        const index = url.substring(url.indexOf("=") + 1);


        const videoid = "video" + index.toString();
        var pdfUrl;


        const fetchData = () => {
            fetch(`https://server-api-jade.vercel.app/admin/read`, {
                method: "GET",
                headers: {
                    "Content-Type": "application/json",
                }
            })
                .then(response => {
                    if (!response.ok) {
                        throw new Error('Network response was not ok ' + response.statusText);
                    }
                    return response.json();
                })
                .then(async data => {
                    // const finalData = data.msg;
                    console.log(data);
                    // setData(data);
                    const finalData = await data.msg;
                    return finalData;
                })
                .then(data => {
                    const titletext = document.getElementById("title");
                    const desctext = document.getElementById("desc");
                    const iframe = document.getElementById("iframe");
                    const codeBlock = document.getElementById('code-block');
                    const filename = document.getElementById("filename");
                    const download = document.getElementById('download');

                    // console.log(videoid);
                    titletext.innerText = data[videoid].title;
                    desctext.innerText = data[videoid].desc;
                    iframe.src = data[videoid].videourl;
                    codeBlock.textContent = data[videoid].code.trim();
                    Prism.highlightElement(codeBlock);
                    filename.innerText = "Lec" + index.toString() + ".py";
                    pdfUrl = data[videoid].note;
                    preview.href = pdfUrl;
                    // download.href = pdfUrl;
                    // download.download = 'lec' + index.toString() + '.pdf';


                })
                .catch(error => {
                    console.error('There has been a problem with your fetch operation:', error);
                });
        }




        // var pdfUrl = './resources/' + videoid + '.pdf'; // Replace with your PDF URL



        // preview.addEventListener("click", () => {

        //     preview.href = pdfUrl;


        // })

        var height1 = document.getElementById("left-part").style.height;
        var right = document.getElementById("right-part");
        right.style.height = height1;

        document.getElementById('download').addEventListener('click', function () {

            fetch(pdfUrl, {
                method: "GET",
                headers: {
                    "Content-Type": "application/json",
                }
            })
                .then(response => response.blob())
                .then(blob => {
                    var url = window.URL.createObjectURL(blob);
                    var link = document.createElement('a');
                    link.href = url;
                    link.download = 'lec' + index.toString() + '.pdf'; // Specify the file name
                    document.body.appendChild(link);
                    link.click();
                    document.body.removeChild(link);
                    window.URL.revokeObjectURL(url);
                })
                .catch(err => {
                    console.error('Error:', err);
                    alert("Resource file not yet prepeared or uploaded please try again later");
                });

        });

        // Fetch the JSON file


        fetchData();

    });
}

export default setItem;

