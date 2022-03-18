import numpy
from dash import Dash, html, dcc, Input, Output
import pandas as pd
import plotly.express as px

video_score = pd.read_excel(
    r'C:\Users\zhuo.cheng\Desktop\Learning\frontend_github\Snake-Minigame\New folder\data\video_score.xlsx')
network_kpis = pd.read_excel(
    r'C:\Users\zhuo.cheng\Desktop\Learning\frontend_github\Snake-Minigame\New folder\data\network_coverage_march_7.xlsx')
vid_scores = video_score.columns[2:]
kpis = network_kpis.columns[4:]


network_kpis[' Geography L2'] = network_kpis[' Geography L2'].apply(
    lambda x: x.lower())
video_score['Location'] = video_score['Location'].apply(lambda x: x.lower())
ndf = network_kpis.merge(
    video_score, left_on=' Geography L2', right_on='Location')

external_stylesheets = ['https://codepen.io/chriddyp/pen/bWLwgP.css']

app = Dash(__name__, external_stylesheets=external_stylesheets)
app.layout = html.Div([
    html.Div([
        html.Div([
            dcc.Dropdown(
                options=kpis, value=' RSRP Avg Value', id='crossfilter-xaxis-column'
            )
        ], style={'width': '49%', 'display': 'inline-block'}),

        html.Div([
            dcc.Dropdown(
                options=vid_scores,
                value='Akamai 1080P (Video.Videoloadtime.Cdnresvideoloadtime Lte Mean)',
                id='crossfilter-yaxis-column'
            ),
        ], style={'width': '49%', 'float': 'right', 'display': 'inline-block'})
    ], style={
        'padding': '10px 5px'
    }),

    html.Div([
        dcc.Graph(
            id='crossfilter-indicator-scatter',
            # hoverData={'points': [{'customdata': 'Japan'}]}
        )
    ], style={'width': '49%', 'display': 'inline-block', 'padding': '0 20'}),
])


@app.callback(
    Output('crossfilter-indicator-scatter', 'figure'),
    Input('crossfilter-xaxis-column', 'value'),
    Input('crossfilter-yaxis-column', 'value'),)
def update_graph(xaxis_column_name, yaxis_column_name):

    fig = px.scatter(x=ndf[xaxis_column_name],
                     y=ndf[yaxis_column_name],
                     trendline="ols",
                     trendline_color_override='burlywood'
                     )

    fig.update_layout(
        margin={'l': 40, 'b': 40, 't': 10, 'r': 0}, hovermode='closest')
    fig.update_xaxes(title=xaxis_column_name)

    fig.update_yaxes(title=" ".join(yaxis_column_name.split(" ")[:2]))
    return fig


if __name__ == '__main__':
    app.run_server(debug=False)
