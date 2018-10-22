import { Component, inject } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { DOCUMENT } from '@angular/common';
import {VgAPI, VgMedia, VgStates} from 'videogular2/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {

  videos = [
    {url: 'assets/CH1.mp4', isMaster: false,  id: 'video1'},
    {url: 'assets/CH2.mp4', isMaster: false,  id: 'video2'},
    {url: 'assets/CH3.mp4', isMaster: false,  id: 'video3'},
    {url: 'assets/SHORT_CH1.mp4', isMaster: false,  id: 'video4'},
  ];

  api: VgAPI;

  constructor(private http: HttpClient) {}

  // Player events
  onPlayerReady(api: VgAPI) {
    this.api = api;
    this.api.medias['video1'].playAtferSync = true;
    this.videos.forEach((video) => {
      this.api.medias[video.id].volume = 0;
      // let x = this.api.medias[video.id].duration;
    });
  }

  // Video Events
  onVideoPaused(e) {
    // if (e.srcElement.id.indexOf('video') > -1) {
    //   e.srcElement.load();
    // }
  }

  onVideoEnded(e) {
    const sourceElement = e.srcElement;

    setTimeout(() => {
      this.videos.forEach((video) => {
        const vgmedia = this.api.medias[video.id];
        debugger
        if (vgmedia.state !== VgStates.VG_ENDED) {
          vgmedia.play();
        }
      });
    }, 2000);
  }

  onVideoClicked(e) {
    this.toggleFullScreen(e.srcElement);
  }

  private toggleFullScreen(element) {
    if (element.classList.contains('full-screen')) {
      element.classList.remove('full-screen');
    } else {
      element.classList.add('full-screen');
    }
  }

  private isVideo(element) {
    return element.id.indexOf('video') > -1;
  }
}
