import * as React from "react";

export interface TableProps {  }

interface TableState { selectedStr: string; selectedLines: Array<JSX.Element> }

let rows = Array<JSX.Element>();
rows.push(<tr><th> </th><th>Пн</th><th>Вт</th><th>Ср</th><th>Чт</th><th>Пт</th><th>Сб</th></tr>)
var xhr = new XMLHttpRequest();

xhr.open('GET', 'https://script.google.com/macros/s/AKfycbxhIXVwHV3th1xmRiDnD3vgNpHj9LsxGYJSFUZhoazvXN3hHmI/exec', false);
xhr.send();

if (xhr.status != 200) {
    alert('Ошибка ' + xhr.status + ': ' + xhr.statusText);
} else {
    var jsonArray = JSON.parse(xhr.responseText);
}

let selectedItemsMap = new Map<string, JSX.Element>();

export class TableFromJson extends React.Component<TableProps, TableState> {

    constructor(props: TableProps) {
        super(props);
        this.state = { selectedStr: 'Выберите запись в таблице', selectedLines: Array<JSX.Element>() };

        for (var i = 0; i < jsonArray.length; i++) {
            rows.push(
                <tr>
                    <th>{jsonArray[i]["Время"]}</th>
                    <th onClick={this.onClick} >{jsonArray[i]["Пн"]}</th>
                    <th onClick={this.onClick}>{jsonArray[i]["Вт"]}</th>
                    <th onClick={this.onClick}>{jsonArray[i]["Ср"]}</th>
                    <th onClick={this.onClick}>{jsonArray[i]["Чт"]}</th>
                    <th onClick={this.onClick}>{jsonArray[i]["Пт"]}</th>
                    <th onClick={this.onClick}>{jsonArray[i]["Сб"]}</th>
                </tr>)
        }
    }

    public onClick = (event: React.MouseEvent<HTMLTableHeaderCellElement>) => {
        let tempLines = Array<JSX.Element>();
        if (event.currentTarget.textContent != "") {

            if (selectedItemsMap.has(event.currentTarget.textContent)) {
                event.currentTarget.style.background = "";
                selectedItemsMap.delete(event.currentTarget.textContent);
            } else {
                event.currentTarget.style.background = "#ffba2c";
                document.getElementById("send").scrollIntoView({ behavior: 'smooth' });
                selectedItemsMap.set(event.currentTarget.textContent, <p>{event.currentTarget.textContent}</p>);              
            }
            selectedItemsMap.forEach(element => {
                tempLines.push(element)
            });
            this.setState({ selectedLines: tempLines })
        }
    }

    public sendData = (event: React.MouseEvent<HTMLElement>) => {

        const Http = new XMLHttpRequest();
        var url = "url?data=" + encodeURIComponent(JSON.stringify({ "club": "1", "datatype": "Заявка с сайта", "name": "", "number": "", "text": this.state.selectedLines}));
        Http.open("GET", url, true);
        Http.setRequestHeader("Content-Type", "application/json");
        Http.send();
        if (Http.status != 200) {
            alert('Ошибка ' + Http.status + ': ' + Http.statusText);
        }

    }

    render() {

        return <React.Fragment>

            <h3 className="headerText">Для записи необходимо выбрать день из таблицы и отправить заявку</h3>

            <table>
                {rows}
            </table>

            <div className="block2">
                <form className="decor" />
                <div className="form-inner">
                    <h3 id="send">Отправить заявку </h3>
                    <p>{this.state.selectedLines}</p>
                    <input type="text" placeholder="Имя" />
                    <input type="phone" placeholder="Телефон" />
                    <input type="submit" value="Отправить" onClick={this.sendData} />
                </div>
            </div>

        </React.Fragment>;
    }

}
