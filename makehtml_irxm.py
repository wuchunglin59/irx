import os
import re


'''
html = ''
file = open('html_model.txt', 'r', encoding='UTF-8')
for line in file.readlines():
  html += line
file.close()

files = os.listdir(path)
for dir_name in files:
  png_list = os.listdir(path + '/' + dir_name)
  png_html = ''
  for png_name in png_list:
    if '.png' in png_name:
      png_html += '<li><img src="' + path + '/' + dir_name + '/' + png_name + '" alt=""></li>' + '\n'
  file = open('images_html/IRX/' + dir_name + '.html' ,'w', encoding='UTF-8')
  file.write(html.replace('message',png_html))
  file.close()
'''
'''舊版本
files = os.listdir(path)
for dir_name in files:
  png_list = os.listdir(path + '/' + dir_name)
  png_html = ''
  for png_name in png_list:
    if '.png' in png_name:
      png_html += '<li><img src="' + path + '/' + dir_name + '/' + png_name + '"></li>' + '\n'
  file = open('images_html/IRXM/' + dir_name + '.txt' ,'w', encoding='UTF-8')
  file.write('<ul class="slides">' + png_html + '</ul>')
  file.close()
'''
path = 'images/IRXM'
files = os.listdir(path)
for dir_name in files:
  png_list = os.listdir(path + '/' + dir_name)
  
  carousel_indicators = '<ul class="carousel-indicators carousel-indicators-numbers">' + '\n'
  carousel_inner = ''
  i = 0
  for png_name in png_list:
    if re.search('([-\w]+\.(?:jpg|jpeg|gif|png))', png_name.lower()):
        carousel_indicators += '<li data-target="#myCarousel" data-slide-to="' + str(i) + '">' + str(i+1) + '</li>' + '\n'
        carousel_inner += '<div class="carousel-item"><img src="' + path + '/' + dir_name + '/' + png_name + '" alt=""></div>' + '\n'
        i += 1
        
  file = open('images_html/IRXM/' + dir_name + '_indicators.txt' ,'w', encoding='UTF-8')
  file.write(carousel_indicators + "</ul>")
  file.close()
  file = open('images_html/IRXM/' + dir_name + '_inner.txt' ,'w', encoding='UTF-8')
  file.write(carousel_inner)
  file.close()  
print('end')
    

