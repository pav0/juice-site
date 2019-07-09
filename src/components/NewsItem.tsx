import * as React from "react";

export interface NewsProps { title: string; date: string; text: string; imgUrl: string }

export class NewsItem extends React.Component<NewsProps, {}> {

    public constructor(props: NewsProps) {
        super(props);

    }
    //<img src={this.props.imgUrl} alt="News Photo" />
    render() {

        return <React.Fragment>

            <div className="post-item">
                <div className="item-content">
                    <h3 className="item-body">{this.props.title}</h3>
                    <div className="item-body">
                        <h4>{this.props.date}</h4>
                        <p>{this.props.text}</p>
                    </div>
                    <div className="item-footer">
                        <a href="#" className="link"><span>Подробнее</span></a>
                    </div>
                </div>
            </div>
        </React.Fragment>;
    }
}
