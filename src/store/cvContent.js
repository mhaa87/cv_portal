export default {
    namespaced: true,
    state: {
        name: "Firstname Lastname",
        personInfo: [
            {title: "Mobile", text: "12345678"},
            {title: "Email", text: "email@hotmail.com"},
            {title: "Place", text: "City"},
        ],
        profileImg: "https://upload.wikimedia.org/wikipedia/commons/8/89/Portrait_Placeholder.png",
        profileImgHeight: 150,
        intro: {title: "Introduction", text: "..."},
        other: {title: "Other", text: "..."},
        lists: [
            {title: "Experience", list: [
                { duration: {from: {year: "2016", month: "01"}, to: {year: "2019", month: "03"}}, title: "Job 3", text: "Info..."},
                { duration: {from: {year: "2015", month: "02"}, to: {year: "2015", month: "11"}}, title: "Job 2", text: "Info..."}, 
                { duration: {from: {year: "2013", month: "09"}, to: {year: "2014", month: "10"}}, title: "Job 1", text: "Info..."}]},
            {title: "Education", list: [
                { duration: {from: {year: "2010", month: ""}, to: {year: "2013", month: ""}}, title: "Study 2", text: "Info..."}, 
                { duration: {from: {year: "2009", month: ""}, to: {year: "2010", month: ""}}, title: "Study 1", text: "Info..."}]},
        ],
        font: "'Times New Roman', Times, serif",
    fontSize: 14,}
}