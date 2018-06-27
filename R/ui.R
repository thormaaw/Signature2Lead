#
# This is the user-interface definition of a Shiny web application. You can
# run the application by clicking 'Run App' above.
#
# Find out more about building applications with Shiny here:
# 
#    http://shiny.rstudio.com/
#

library(shiny)
library(plotly)

# Define UI for application that draws a histogram
shinyUI(fluidPage(
  
  # Application title
  titlePanel("Sig2Lead"),
  
  # Sidebar with a slider input for number of bins 
#  sidebarLayout(
#    sidebarPanel(
  #     sliderInput("bins",
   #                "Number of bins:",
    #               min = 1,
     #              max = 50,
      #             value = 30)
#    ),
    
    # Show a plot of the generated distribution
#    mainPanel(
      fluidPage(
        tabsetPanel(
          tabPanel("Search", value ="search", icon = NULL,
           column(3, textInput("gene_knockdown", h3("Input a Gene"), value="bcl2a1")),
           column(3,
           br(),
           br(),
           br(),
           actionButton(label="Go!", "Go"),
           fileInput("AddedCompounds", h3("Add compounds in SMILES (Optional)"), multiple = TRUE, accept = c(".smi", ".csv"), width = NULL,
                     buttonLabel = "Browse...", placeholder = "No file selected")
        )),
        
#        mainPanel(
#        textOutput("ItWorked"),
          tabPanel("LINCS Compounds", value = "LINCS Compounds", icon =NULL,
          DT::dataTableOutput("SMILES"),
          downloadButton("SMILESDownload", label = "Download SMILES"),
          downloadButton("SDFDownload", label = "Download SDF")
        ),
      tabPanel("Heatmap", value="heatmap", icon = NULL, 
#               actionButton(label="GenerateHeatmap", "GenerateHeatmap"),
               textInput("CutHeight", "Tanimoto Similarity", value="0.8"),
               textInput("ClusterSize", "Minimum Cluster Size", value="4"),
               actionButton(label="GetRepresentatives", "GetRepresentatives"),
               plotOutput("distPlot", width = "850px", height = "800px"),
               DT::dataTableOutput("Representatives"),
               downloadButton("RepDownload", label="Download Representatives")
              
        ),
      tabPanel("MDS Plot", value="MDS", icon=NULL,
               plotOutput("MDSPlot", width = "900px", height = "800px")
               )
      )
  )
)
)

