import numpy
from dash import Dash, html, dcc, Input, Output
import pandas as pd
import plotly.express as px

app = Dash(__name__)


if __name__ == '__main__':
    app.run_server(debug=True)
