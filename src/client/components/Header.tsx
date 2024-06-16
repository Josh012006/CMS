



function Header() {

    return (
        <header className="grid grid-cols-12 py-2 bg-white">
            <h1 className="col-span-12 lg:col-span-4 mx-auto my-3 lg:my-0 font-bold text-2xl">My Post</h1>
            <nav className="flex justify-around items-center col-span-12 lg:col-span-8">
                <a href="/">Home</a>
                <a href='/posts'>Posts</a>
                <a href='/profile'>Profile</a>
            </nav>
        </header>
    );
}

export default Header;