

from bs4 import BeautifulSoup as bs
from splinter import Browser
import pandas as pd
import numpy as np
import requests
import traceback
import os
import time
import pymongo
from flask import Flask, render_template, redirect
from flask_pymongo import PyMongo


def init_browser():
    driver_path = '/Users/henrynahmad/anaconda3/envs/PythonData/bin/chromedriver'
    executable_path = {"executable_path": driver_path}
    return Browser('chrome', **executable_path, headless=False)

def scrape():
    browser = init_browser()
#Mars News

    url_mars_news = 'https://mars.nasa.gov/news/'
    browser.visit(url_mars_news)
    html_variable = browser.html
    soup = bs(html_variable, 'lxml')
    news_title = soup.find('div',class_="content_title").text
    news_paragraph = soup.find("div", class_="article_teaser_body").text

#Assignment Part 2:  Images

    url_image = 'https://www.jpl.nasa.gov/spaceimages/?search=&category=Mars'
    browser.visit(url_image)
    html_variable2 = browser.html
    soup2 = bs(html_variable2, 'lxml')
    results = soup.find_all('footer')
    len(results)




#  https://www.jpl.nasa.gov/spaceimages/images/mediumsize/PIA16837_ip.jpg


# Assignement Part 3 Weather

    weather_url = 'https://twitter.com/marswxreport?lang=en'
    browser.visit(weather_url)
    html3 = browser.html
    soup3 = bs(html3,'lxml')
    mars_weather = soup3.find('p',class_="TweetTextSize TweetTextSize--normal js-tweet-text tweet-text").text

#Assignment Part 4: Facts

    facts_url = 'http://space-facts.com/mars/'
    browser.visit(facts_url)
    tables = pd.read_html(facts_url)
    mars_facts_df = tables[0]
    mars_facts_df.columns = ['Fact_Item','Actual_Fact']
    mars_facts_df.set_index('Fact_Item', inplace=True)
    mars_facts_html = mars_facts_df.to_html()
    mars_facts_html = mars_facts_html.replace('\n','')

# Assignment Part 5  Mars Hemispheres

    marsfinalurl = 'https://astrogeology.usgs.gov/search/results?q=hemisphere+enhanced&k1=target&v1=Mars'
    browser.visit(marsfinalurl)
    html5 = browser.html
    soup5= bs(html5,'lxml')

# create empty list for images urls

    imageurls = []

# create empty list for names

    names = []

    images = soup5.find_all('div', class_='item')

# Need to iterate the images


    for image in images:
        title = image.find('h3').text
        imageurl = image.find('a', class_='itemLink product-item')['href']
        imageurls.append(imageurl)
        names.append(title)

# add base URL to paths above

    base_url = 'https://astrogeology.usgs.gov'
    image_fullurls=[]

    for path in imageurls:
        full_url = base_url+path
        image_fullurls.append(full_url)
        hemispheres_dict = dict(zip(names,image_fullurls))

#hemispheres_dict

if __name__ == "__main__":
    scrape()



