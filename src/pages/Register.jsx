function Register() {
    return (
        <div className="d-flex justify-content-center mt-5">
            <div className="regiser-root">
                <div className="form shadow rounded d-flex justify-content-center pb-3">
                    <div className="form-content">
                        <form target="/manage" action="/register" method="POST" enctype="multipart/form-data">
                            <div className="row m-5">
                                <div className="col-3">
                                    <label htmlFor="emailInput">Email : </label>
                                </div>
                                <div className="col-9">
                                    <input className="w-100" name="email" type="email" />
                                </div>
                            </div>
                            <div className="row m-5">
                                <div className="col-3">
                                    <label htmlFor="emailInput">Name : </label>
                                </div>
                                <div className="col-9">
                                    <input className="w-100" name="name" type="text" />
                                </div>
                            </div>
                            <div className="row m-5">
                                <div className="col-3">
                                    <label htmlFor="emailInput">Image :  </label>
                                </div>
                                <div className="col-9">
                                    <input name="image" type="file" accept=".jpg" className="w-100" />
                                </div>
                            </div>
                            {/* <input type="submit btn btn-success">Submit</input> */}
                            <div className="d-flex justify-content-center">
                                <input type="submit" className="btn btn-success" />
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Register;