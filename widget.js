let myCropWidget = cloudinary.createUploadWidget({
    cloudName: process.env.CLName, 
    uploadPreset: process.env.CLupload, 
    folder: 'widgetUpload', 
    cropping: true 
    }, 
    (error, result) => { 
        if (!error && result && result.event === "success") {
            document.getElementById("profile_picture").setAttribute("value", result.info.secure_url)
          }
        }
      )
      
      document.getElementById("upload_widget").addEventListener(
        "click",
        function () {
          myCropWidget.open()
          console.log()
        },
        false
    )