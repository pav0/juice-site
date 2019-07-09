import * as React from "react";

export interface TrainerProps {
    club: string; name: string; specialization: string; text: string
    ; photoURL: string; vkURL: string; instaURL: string
}

export class TrainerItem extends React.Component<TrainerProps, {}> {

    public constructor(props: TrainerProps) {
        super(props);

    }

    render() {

        return <React.Fragment>

            <div className="containert">
                <div className="post">
                    <div className="post-image">
                        <img src={this.props.photoURL} />
                    </div>
                    <div className="post-content">
                        <div className="post-header">
                            <h2>{this.props.name}</h2>
                            <div className="post-meta">

                                <span className="category">{this.props.specialization}</span>
                            </div>
                        </div>
                        <p>{this.props.text}</p>
                    </div>
                </div>
            </div>

        </React.Fragment>;
    }
}
