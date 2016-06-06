'use strict';
/* globals Npm */

let amqp = require( 'amqplib/callback_api' ),
    path = require( 'path' ),
    Future = require( path.join( 'fibers', 'future' ) );

let Rabbit = function () {
  let connection = null,
      channel = null,
      memoRabbitUrl = null;

  let doError = function doError( err ) {
    if ( err ) {
      throw err;
    }
  };

  let getConnection = function getConnection( url ) {
    let future = new Future();

    amqp.connect( url, ( err, conn ) => {

      doError( err );

      connection = conn;
      future.return( conn );
    } );

    return future.wait();
  };

  let createChannel = function createChannel( connection ) {
    let future = new Future();

    connection.createChannel( ( err, ch ) => {

      doError( err );

      channel = ch;

      future.return( ch );
    } );

    return future.wait();
  };

  return {
    connect: function connect( rabbitUrl ) {
      if ( connection ) {

        if ( rabbitUrl !== memoRabbitUrl ) {
          connection.disconnect();
          connection = null;
        }
      }

      if ( !connection ) {
        createChannel( getConnection( rabbitUrl ) );
      }

      return this;
    },

    getFrom: function getFrom( tail, prefetch, cb ) {

      if (typeof prefetch === 'function') {
        cb = prefetch;
        prefetch = 1;
      }

      channel.prefetch( 1 );
      channel.assertQueue( tail );

      channel.consume( tail, ( msg ) => {
        cb( JSON.parse( msg.content.toString().replace( new RegExp( '\\$', 'g' ), '_f_' ) ), msg );
      } );
    },

    sendTo: function sendTo( tail, msg ) {
      channel.assertQueue( tail );
      channel.sendToQueue( tail, new Buffer( JSON.stringify( msg ) ), { persistent: true } );
    },

    ack: function ( msg ) {
      channel.ack( msg );
    },

    close: function (cb) {
      channel.close(cb);
    },

    run: Future.task
  };
};

module.exports = new Rabbit();
