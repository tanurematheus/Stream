import React from 'react';
import api from '../service/api'

class Upload extends React.Component {
    state = {
        selectedFile: null,
        uploading: false
    };

    displayFileName = (event) => {
        const fileInput = event.target;
        const fileName = fileInput.files[0].name;
        const label = document.querySelector('.custom-file-label');
        label.textContent = fileName;
        this.setState({ selectedFile: fileInput.files[0] });
    };

    handleSubmit = async (event) => {
        event.preventDefault();
        const formData = new FormData();
        formData.append('file', this.state.selectedFile);
        this.setState({ uploading: true });
        try {
            const response = await api.post("/upload", formData);
            console.log('File uploaded successfully:', response.data);
            // Do something with the response if needed
        } catch (error) {
            console.error('Error uploading file:', error);
            // Handle error appropriately
        } finally {
            this.setState({ uploading: false });
        }
    };

    render() {
        return (
            <div className="container">
                <div className="row">
                    <div className="col-md-6 m-auto">
                        <h1 className="text-center display-4 my-4">Mongo File Uploads</h1>
                        {this.state.uploading ? (
                            <div className="text-center">
                                <h2>Uploading...</h2>
                                <div class="spinner-border" role="status">
                                    <span class="sr-only">Loading...</span>
                                </div>
                            </div>
                        ) : (
                            <form onSubmit={this.handleSubmit} encType="multipart/form-data">
                                <div className="custom-file mb-3">
                                    <input
                                        type="file"
                                        name="file"
                                        id="file"
                                        className="custom-file-input"
                                        onChange={this.displayFileName}
                                    />
                                    <label htmlFor="file" className="custom-file-label">
                                        Choose File
                                    </label>
                                </div>
                                <input type="submit" value="Submit" className="btn btn-primary btn-block" />
                            </form>
                        )}
                        <hr />
                    </div>
                </div>
            </div>
        );
    }
}

export default Upload;
