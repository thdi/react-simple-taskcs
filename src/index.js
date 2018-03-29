import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';

var createReactClass = require('create-react-class');

var Field = createReactClass({
    getInitialState: function () {
        return {
            tasks: [
                'Необходимо купить молоко',
                'Надо почистить зубы',
                'Просто отдохнуть'
            ]
        }
    },

    deleteBlock: function (i) {
        var arr = this.state.tasks;
        arr.splice(i, 1);

        this.setState({tasks: arr});
    },

    updateText: function(text, i) {
        var arr = this.state.tasks;
        arr[i] = text;
        this.setState({tasks: arr});
    },

    eachTask: function(item, i){
        return (
            <Task key={i} index={i} update={this.updateText} deleteBlock={this.deleteBlock}>
                {item}
            </Task>
        );
    },

    render: function() {
        return (
            <div className="field">
                {this.state.tasks.map(this.eachTask)}
            </div>
        );
    }
});

var Task = createReactClass({
    getInitialState: function () {
        return {edit:false}
    },

    edit: function () {
        this.setState({edit: true});
    },

    remove: function () {
        this.props.deleteBlock(this.props.index);
    },

    save: function () {
        var value = this.refs.newTxt.value;

        this.props.update(value, this.props.index);

        this.setState({edit: false});
    },

    rendNorm: function () {
        return (
            <div className="box">
                <div className="text">{this.props.children}</div>
                <button onClick={this.edit} className="btn light">Редактировать</button>
                <button onClick={this.remove} className="btn red">Удалить</button>
            </div>
        );
    },

    rendEdit: function () {
        return (
            <div className="box">
                <textarea ref="newTxt" defaultValue={this.props.children}></textarea>
                <button onClick={this.save} className="btn success">Сохранить</button>
            </div>
        );
    },

    render: function () {
        if(this.state.edit) {
            return this.rendEdit ();
        } else {
            return this.rendNorm ();
        }
    }
});

ReactDOM.render(
    <Field/>
    ,
    document.getElementById('root')
);
