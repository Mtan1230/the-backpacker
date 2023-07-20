const addPost = async (e) => {
    e.preventDefault();
    //Add event listener Funtion to retrieve values from traveller
    const form = $(document.getElementById('form'));
    form.click(function (e) {

        let leavingFrom = document.getElementById('leavingFrom').value;
        let destination = document.getElementById('destination').value;
        let departure = document.getElementById('departure').value;
        let number_traveller = Math.floor(Math.random() * 10) + 1;

    });
}
document.querySelector('.add-post-btn').addEventListener('click', addPost);