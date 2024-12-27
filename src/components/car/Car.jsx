import React, { Component } from "react";

export default class Car extends Component {
  constructor() {
    super();
    this.state = {
      name: "",
      price: "",
      desc: "",
      editId: null,
      data: JSON.parse(localStorage.getItem("data")) || [],
    };
  }
  handleSubmit = (e) => {
    e.preventDefault();
    let { name, desc, price, editId, data } = this.state;
    if (!name || !price || !desc) {
      alert("Barcha malumotlar kiritilishi kerak");
      return;
    }
    if (editId) {
        const updatingData = data?.map((item) =>
          item.id === editId ? { ...item, name, desc, price } : item
        );
        this.setState({ data: updatingData, name: "", price: "", desc: "", editId: null });
        localStorage.setItem("data", JSON.stringify(updatingData));
    }else{
        let newCar = {
          id: Date.now(),
          name,
          desc,
          price,
        };
        const store = [...this.state.data, newCar];
        this.setState({ data: store, name: "", price: "", desc: "" });
        localStorage.setItem("data", JSON.stringify(store));
    }
    
  };
  handleDelete = (id) => {
    const store = this.state.data.filter((item) => item.id !== id);
    this.setState({ data: store });
    localStorage.setItem("data", JSON.stringify(store));
  };
  handleEdit = (car) => {
    const { name, price, desc, id } = car;
    this.setState({
      name,
      price,
      desc,
      editId: id,
    });
  };
  render() {
    return (
      <div className="flex">
        <div className="w-80 h-screen bg-slate-200 p-5">
          <form onSubmit={this.handleSubmit} action="">
            <input
              autoFocus
              value={this.state.name}
              onChange={(e) => this.setState({ name: e.target.value })}
              className="w-full h-10 mb-3 indent-3 outline-none"
              placeholder="Name"
              type="text"
            />
            <input
              value={this.state.price}
              onChange={(e) => this.setState({ price: e.target.value })}
              className="w-full h-10 mb-3 indent-3 outline-none"
              placeholder="Price"
              type="number"
            />
            <input
              value={this.state.desc}
              onChange={(e) => this.setState({ desc: e.target.value })}
              className="w-full h-10 mb-3 indent-3 outline-none"
              placeholder="Desc"
              type="text"
            />
            <button className="w-full h-10 bg-slate-500">{ this.state.editId ? "Update" : "Create"}</button>
          </form>
        </div>
        <div className="p-5 flex flex-wrap gap-3 flex-1 items-start content-start">
          {this.state.data?.map((car) => (
            <div key={car.id} className="w-72 shadow-md">
              <div className="w-full h-52 bg-slate-200"></div>
              <div className="p-4">
                <h3 className="text-xl font-medium">{car.name}</h3>
                <p className="line-clamp-1">{car.desc}</p>
                <p className="font-medium">${car.price}</p>
                <div className="mt-3">
                  <button
                    onClick={() => this.handleDelete(car.id)}
                    className="bg-slate-400 px-4 py-1"
                  >
                    Delete
                  </button>
                  <button
                    onClick={() => this.handleEdit(car)}
                    className="ml-2 bg-green-400 px-4 py-1"
                  >
                    Edit
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  }
}
