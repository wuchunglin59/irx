import os
import re


path = 'images\\KIOSK'
files = os.listdir(path)


dirList = []
for dirName in [x[0] for x in os.walk(path)]:
  #print(dirName)
  isdir = False
  for item in os.listdir(dirName):
    if os.path.isdir(dirName + '\\' + item):
      isdir = True
      break
  if not isdir:
    dirList.append(dirName)


for d in dirList:
  fileName = '_'.join(d.split('\\')[2:])
  print(fileName)
  png_list = os.listdir(d)
  carousel_indicators = '<ul class="carousel-indicators carousel-indicators-numbers">' + '\n'
  carousel_inner = ''
  i = 0
  for png_name in png_list:

    if re.search('([-\w]+\.(?:jpg|jpeg|gif|png))', png_name.lower()):
        carousel_indicators += '<li data-target="#myCarousel" data-slide-to="' + str(i) + '">' + str(i+1) + '</li>' + '\n'
        carousel_inner += '<div class="carousel-item"><img src="' + d + '\\' + png_name + '" alt=""></div>' + '\n'
        i += 1
        
  file = open('images_html/KIOSK/' + fileName + '_indicators.txt' ,'w', encoding='UTF-8')
  file.write(carousel_indicators + "</ul>")
  file.close()
  file = open('images_html/KIOSK/' + fileName + '_inner.txt' ,'w', encoding='UTF-8')
  file.write(carousel_inner)
  file.close()
    

'''
for dir_name in files:
  png_list = os.listdir(path + '/' + dir_name)

  carousel_indicators = '<ul class="carousel-indicators carousel-indicators-numbers">' + '\n'
  carousel_inner = '';
  i = 0;
  for png_name in png_list:
    if re.search('([-\w]+\.(?:jpg|jpeg|gif|png))', png_name.lower()):
        carousel_indicators += '<li data-target="#myCarousel" data-slide-to="' + str(i) + '">' + str(i+1) + '</li>' + '\n'
        carousel_inner += '<div class="carousel-item"><img src="' + path + '/' + dir_name + '/' + png_name + '" alt=""></div>' + '\n'
        i += 1
        
  file = open('images_html/KIOSK/' + dir_name + '_indicators.txt' ,'w', encoding='UTF-8')
  file.write(carousel_indicators + "</ul>")
  file.close()
  file = open('images_html/KIOSK/' + dir_name + '_inner.txt' ,'w', encoding='UTF-8')
  file.write(carousel_inner)
  file.close()
  '''
print('end')
