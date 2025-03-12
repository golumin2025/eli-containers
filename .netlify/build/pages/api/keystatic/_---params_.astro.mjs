import { makeGenericAPIRouteHandler } from '@keystatic/core/api/generic';
import { fields, config as config$1, singleton, collection } from '@keystatic/core';
export { r as renderers } from '../../../chunks/_@astro-renderers_XA7zEP0y.mjs';

var setCookie = {exports: {}};

var hasRequiredSetCookie;

function requireSetCookie () {
	if (hasRequiredSetCookie) return setCookie.exports;
	hasRequiredSetCookie = 1;

	var defaultParseOptions = {
	  decodeValues: true,
	  map: false,
	  silent: false,
	};

	function isNonEmptyString(str) {
	  return typeof str === "string" && !!str.trim();
	}

	function parseString(setCookieValue, options) {
	  var parts = setCookieValue.split(";").filter(isNonEmptyString);

	  var nameValuePairStr = parts.shift();
	  var parsed = parseNameValuePair(nameValuePairStr);
	  var name = parsed.name;
	  var value = parsed.value;

	  options = options
	    ? Object.assign({}, defaultParseOptions, options)
	    : defaultParseOptions;

	  try {
	    value = options.decodeValues ? decodeURIComponent(value) : value; // decode cookie value
	  } catch (e) {
	    console.error(
	      "set-cookie-parser encountered an error while decoding a cookie with value '" +
	        value +
	        "'. Set options.decodeValues to false to disable this feature.",
	      e
	    );
	  }

	  var cookie = {
	    name: name,
	    value: value,
	  };

	  parts.forEach(function (part) {
	    var sides = part.split("=");
	    var key = sides.shift().trimLeft().toLowerCase();
	    var value = sides.join("=");
	    if (key === "expires") {
	      cookie.expires = new Date(value);
	    } else if (key === "max-age") {
	      cookie.maxAge = parseInt(value, 10);
	    } else if (key === "secure") {
	      cookie.secure = true;
	    } else if (key === "httponly") {
	      cookie.httpOnly = true;
	    } else if (key === "samesite") {
	      cookie.sameSite = value;
	    } else if (key === "partitioned") {
	      cookie.partitioned = true;
	    } else {
	      cookie[key] = value;
	    }
	  });

	  return cookie;
	}

	function parseNameValuePair(nameValuePairStr) {
	  // Parses name-value-pair according to rfc6265bis draft

	  var name = "";
	  var value = "";
	  var nameValueArr = nameValuePairStr.split("=");
	  if (nameValueArr.length > 1) {
	    name = nameValueArr.shift();
	    value = nameValueArr.join("="); // everything after the first =, joined by a "=" if there was more than one part
	  } else {
	    value = nameValuePairStr;
	  }

	  return { name: name, value: value };
	}

	function parse(input, options) {
	  options = options
	    ? Object.assign({}, defaultParseOptions, options)
	    : defaultParseOptions;

	  if (!input) {
	    if (!options.map) {
	      return [];
	    } else {
	      return {};
	    }
	  }

	  if (input.headers) {
	    if (typeof input.headers.getSetCookie === "function") {
	      // for fetch responses - they combine headers of the same type in the headers array,
	      // but getSetCookie returns an uncombined array
	      input = input.headers.getSetCookie();
	    } else if (input.headers["set-cookie"]) {
	      // fast-path for node.js (which automatically normalizes header names to lower-case
	      input = input.headers["set-cookie"];
	    } else {
	      // slow-path for other environments - see #25
	      var sch =
	        input.headers[
	          Object.keys(input.headers).find(function (key) {
	            return key.toLowerCase() === "set-cookie";
	          })
	        ];
	      // warn if called on a request-like object with a cookie header rather than a set-cookie header - see #34, 36
	      if (!sch && input.headers.cookie && !options.silent) {
	        console.warn(
	          "Warning: set-cookie-parser appears to have been called on a request object. It is designed to parse Set-Cookie headers from responses, not Cookie headers from requests. Set the option {silent: true} to suppress this warning."
	        );
	      }
	      input = sch;
	    }
	  }
	  if (!Array.isArray(input)) {
	    input = [input];
	  }

	  if (!options.map) {
	    return input.filter(isNonEmptyString).map(function (str) {
	      return parseString(str, options);
	    });
	  } else {
	    var cookies = {};
	    return input.filter(isNonEmptyString).reduce(function (cookies, str) {
	      var cookie = parseString(str, options);
	      cookies[cookie.name] = cookie;
	      return cookies;
	    }, cookies);
	  }
	}

	/*
	  Set-Cookie header field-values are sometimes comma joined in one string. This splits them without choking on commas
	  that are within a single set-cookie field-value, such as in the Expires portion.

	  This is uncommon, but explicitly allowed - see https://tools.ietf.org/html/rfc2616#section-4.2
	  Node.js does this for every header *except* set-cookie - see https://github.com/nodejs/node/blob/d5e363b77ebaf1caf67cd7528224b651c86815c1/lib/_http_incoming.js#L128
	  React Native's fetch does this for *every* header, including set-cookie.

	  Based on: https://github.com/google/j2objc/commit/16820fdbc8f76ca0c33472810ce0cb03d20efe25
	  Credits to: https://github.com/tomball for original and https://github.com/chrusart for JavaScript implementation
	*/
	function splitCookiesString(cookiesString) {
	  if (Array.isArray(cookiesString)) {
	    return cookiesString;
	  }
	  if (typeof cookiesString !== "string") {
	    return [];
	  }

	  var cookiesStrings = [];
	  var pos = 0;
	  var start;
	  var ch;
	  var lastComma;
	  var nextStart;
	  var cookiesSeparatorFound;

	  function skipWhitespace() {
	    while (pos < cookiesString.length && /\s/.test(cookiesString.charAt(pos))) {
	      pos += 1;
	    }
	    return pos < cookiesString.length;
	  }

	  function notSpecialChar() {
	    ch = cookiesString.charAt(pos);

	    return ch !== "=" && ch !== ";" && ch !== ",";
	  }

	  while (pos < cookiesString.length) {
	    start = pos;
	    cookiesSeparatorFound = false;

	    while (skipWhitespace()) {
	      ch = cookiesString.charAt(pos);
	      if (ch === ",") {
	        // ',' is a cookie separator if we have later first '=', not ';' or ','
	        lastComma = pos;
	        pos += 1;

	        skipWhitespace();
	        nextStart = pos;

	        while (pos < cookiesString.length && notSpecialChar()) {
	          pos += 1;
	        }

	        // currently special character
	        if (pos < cookiesString.length && cookiesString.charAt(pos) === "=") {
	          // we found cookies separator
	          cookiesSeparatorFound = true;
	          // pos is inside the next cookie, so back up and return it.
	          pos = nextStart;
	          cookiesStrings.push(cookiesString.substring(start, lastComma));
	          start = pos;
	        } else {
	          // in param ',' or param separator ';',
	          // we continue from that comma
	          pos = lastComma + 1;
	        }
	      } else {
	        pos += 1;
	      }
	    }

	    if (!cookiesSeparatorFound || pos >= cookiesString.length) {
	      cookiesStrings.push(cookiesString.substring(start, cookiesString.length));
	    }
	  }

	  return cookiesStrings;
	}

	setCookie.exports = parse;
	setCookie.exports.parse = parse;
	setCookie.exports.parseString = parseString;
	setCookie.exports.splitCookiesString = splitCookiesString;
	return setCookie.exports;
}

var setCookieExports = /*@__PURE__*/ requireSetCookie();

function makeHandler(_config) {
  return async function keystaticAPIRoute(context) {
    var _context$locals, _ref, _config$clientId, _ref2, _config$clientSecret, _ref3, _config$secret;
    const envVarsForCf = (_context$locals = context.locals) === null || _context$locals === void 0 || (_context$locals = _context$locals.runtime) === null || _context$locals === void 0 ? void 0 : _context$locals.env;
    const handler = makeGenericAPIRouteHandler({
      ..._config,
      clientId: (_ref = (_config$clientId = _config.clientId) !== null && _config$clientId !== void 0 ? _config$clientId : envVarsForCf === null || envVarsForCf === void 0 ? void 0 : envVarsForCf.KEYSTATIC_GITHUB_CLIENT_ID) !== null && _ref !== void 0 ? _ref : tryOrUndefined(() => {
        return undefined                                          ;
      }),
      clientSecret: (_ref2 = (_config$clientSecret = _config.clientSecret) !== null && _config$clientSecret !== void 0 ? _config$clientSecret : envVarsForCf === null || envVarsForCf === void 0 ? void 0 : envVarsForCf.KEYSTATIC_GITHUB_CLIENT_SECRET) !== null && _ref2 !== void 0 ? _ref2 : tryOrUndefined(() => {
        return undefined                                              ;
      }),
      secret: (_ref3 = (_config$secret = _config.secret) !== null && _config$secret !== void 0 ? _config$secret : envVarsForCf === null || envVarsForCf === void 0 ? void 0 : envVarsForCf.KEYSTATIC_SECRET) !== null && _ref3 !== void 0 ? _ref3 : tryOrUndefined(() => {
        return undefined                                ;
      })
    }, {
      slugEnvName: "PUBLIC_KEYSTATIC_GITHUB_APP_SLUG"
    });
    const {
      body,
      headers,
      status
    } = await handler(context.request);
    let headersInADifferentStructure = /* @__PURE__ */ new Map();
    if (headers) {
      if (Array.isArray(headers)) {
        for (const [key, value] of headers) {
          if (!headersInADifferentStructure.has(key.toLowerCase())) {
            headersInADifferentStructure.set(key.toLowerCase(), []);
          }
          headersInADifferentStructure.get(key.toLowerCase()).push(value);
        }
      } else if (typeof headers.entries === "function") {
        for (const [key, value] of headers.entries()) {
          headersInADifferentStructure.set(key.toLowerCase(), [value]);
        }
        if ("getSetCookie" in headers && typeof headers.getSetCookie === "function") {
          const setCookieHeaders2 = headers.getSetCookie();
          if (setCookieHeaders2 !== null && setCookieHeaders2 !== void 0 && setCookieHeaders2.length) {
            headersInADifferentStructure.set("set-cookie", setCookieHeaders2);
          }
        }
      } else {
        for (const [key, value] of Object.entries(headers)) {
          headersInADifferentStructure.set(key.toLowerCase(), [value]);
        }
      }
    }
    const setCookieHeaders = headersInADifferentStructure.get("set-cookie");
    headersInADifferentStructure.delete("set-cookie");
    if (setCookieHeaders) {
      for (const setCookieValue of setCookieHeaders) {
        var _options$sameSite;
        const {
          name,
          value,
          ...options
        } = setCookieExports.parseString(setCookieValue);
        const sameSite = (_options$sameSite = options.sameSite) === null || _options$sameSite === void 0 ? void 0 : _options$sameSite.toLowerCase();
        context.cookies.set(name, value, {
          domain: options.domain,
          expires: options.expires,
          httpOnly: options.httpOnly,
          maxAge: options.maxAge,
          path: options.path,
          sameSite: sameSite === "lax" || sameSite === "strict" || sameSite === "none" ? sameSite : void 0
        });
      }
    }
    return new Response(body, {
      status,
      headers: [...headersInADifferentStructure.entries()].flatMap(([key, val]) => val.map((x) => [key, x]))
    });
  };
}
function tryOrUndefined(fn) {
  try {
    return fn();
  } catch {
    return void 0;
  }
}

const blogs = {
  label: "Blogs",
  slugField: "title",
  path: "src/data/blogs/*",
  entryLayout: "content",
  format: {
    contentField: "content"
  },
  schema: {
    title: fields.slug({
      name: {
        label: "Blog Title"
      }
    }),
    blogImage: fields.image({
      label: "Blog Image",
      directory: "/public/images/",
      publicPath: "/images/"
    }),
    publicationDate: fields.text({ label: "Published On" }),
    draft: fields.checkbox({
      label: "Draft",
      defaultValue: false
    }),
    seoData: fields.object({
      seoTitle: fields.text({ label: "SEO Title" }),
      seoDescription: fields.text({
        label: "SEO Description",
        multiline: true
      }),
      ogImage: fields.image({
        label: "Open Graph Image",
        directory: "/public/images/seo/",
        publicPath: "/images/seo/"
      })
    }),
    content: fields.markdoc({
      label: "Page Content",
      extension: "md"
    })
  }
};

const mainHero = {
  label: "Main Hero",
  schema: fields.object({
    Sliderimages: fields.array(
      fields.object({
        image: fields.image({
          label: "Slider",
          directory: "/public/images/home",
          publicPath: "/images/home"
        }),
        title: fields.text({ label: "Title" }),
        description: fields.text({ label: "Description", multiline: true })
      }),
      {
        label: "Slider Images",
        itemLabel: (props) => props.fields.title.value
      }
    ),
    quoteFormTitle: fields.text({ label: "Quote Form Title" })
  })
};
const howPodsWork = {
  label: "How MI-BOX Moving & Mobile Storage Works",
  schema: fields.object({
    heading: fields.text({ label: "Heading" }),
    tabs: fields.array(
      fields.object({
        title: fields.text({ label: "Tab Title" }),
        steps: fields.array(
          fields.object({
            title: fields.text({ label: "Step Title" }),
            description: fields.text({
              label: "Step Description",
              multiline: true
            })
          }),
          {
            label: "Steps",
            itemLabel: (props) => props.fields.title.value
          }
        )
      }),
      {
        label: "Tabs",
        itemLabel: (props) => props.fields.title.value
      }
    )
  })
};
const findYouFit = {
  label: "Find Your Fit",
  schema: fields.object({
    heading: fields.text({ label: "Heading" }),
    cards: fields.array(
      fields.object({
        title: fields.text({ label: "Tab Title" }),
        image: fields.image({
          label: "Image URL",
          directory: "/src/assets/images/",
          publicPath: "/src/assets/images/"
        }),
        description: fields.text({ label: "Description", multiline: true }),
        dimensions: fields.text({ label: "Dimensions" }),
        storageSize: fields.text({ label: "Storage Size" }),
        fits: fields.text({ label: "Fits" })
      }),
      {
        label: "Tabs",
        itemLabel: (props) => props.fields.title.value
      }
    )
  })
};
const featuredImage = {
  label: "Featured Image",
  schema: fields.object({
    image: fields.image({
      label: "Image",
      directory: "/src/assets/images/",
      publicPath: "/src/assets/images/"
    }),
    title: fields.text({ label: "Title" }),
    description: fields.text({ label: "Description", multiline: true })
  })
};
const reviewsSlider = {
  label: "Reviews Slider",
  schema: fields.object({
    title: fields.text({ label: "title" }),
    logos: fields.array(
      fields.object({
        image: fields.image({
          label: "Logo",
          directory: "/src/assets/images/",
          publicPath: "/src/assets/images/"
        })
      }),
      {
        label: "Logos"
      }
    )
  })
};
const faqs = {
  label: "FAQs",
  schema: fields.object({
    title: fields.text({ label: "Title" }),
    faqs: fields.array(
      fields.object({
        question: fields.text({ label: "Question" }),
        answer: fields.markdoc.inline({ label: "Answer" })
      }),
      {
        label: "FAQs",
        itemLabel: (props) => props.fields.question.value
      }
    )
  })
};
const masonaryGallery = {
  label: "Masonary Gallery",
  schema: fields.object({
    title: fields.text({ label: "Title" }),
    images: fields.array(
      fields.image({
        label: "Image",
        directory: "/src/assets/images/",
        publicPath: "/src/assets/images/"
      }),
      {
        label: "Images"
      }
    )
  })
};
const podsHelpingBintoGrid = {
  label: "MI-BOX Moving & Mobile Storage Helping Binto Grid",
  schema: fields.object({
    heading: fields.text({ label: "Heading" }),
    cards: fields.array(
      fields.object({
        title: fields.text({ label: "Title" }),
        description: fields.text({ label: "Description", multiline: true }),
        image: fields.image({
          label: "Image",
          directory: "/src/assets/images"
        }),
        icon: fields.image({ label: "Icon", directory: "/src/assets/icons" }),
        size: fields.select({
          label: "Size",
          options: [
            { label: "Normal", value: "normal" },
            { label: "Wide", value: "wide" },
            { label: "Tall", value: "tall" }
          ],
          defaultValue: "normal"
        })
      })
    )
  })
};
const singleHero = {
  label: "Single Hero",
  schema: fields.object({
    bgImage: fields.image({
      label: "BackGround Image",
      directory: "/src/assets/images",
      publicPath: "/src/assets/images"
    }),
    title: fields.text({ label: "Title" }),
    description: fields.text({ label: "Description", multiline: true }),
    showQuoteForm: fields.checkbox({ label: "Show Quote Form", defaultValue: true })
  })
};
const storageOptions = {
  label: "Storage Options",
  schema: fields.object({
    title: fields.text({ label: "Title" }),
    cards: fields.array(
      fields.object({
        image: fields.image({
          label: "Image",
          directory: "/src/assets/images",
          publicPath: "/src/assets/images"
        }),
        size: fields.text({ label: "Size" }),
        dimension: fields.text({ label: "Dimension" }),
        description: fields.array(fields.text({ label: "Description" }), {
          label: "Description Items"
        }),
        link: fields.text({ label: "CTA Link" })
      }),
      {
        label: "Storage Containers",
        itemLabel: (item) => item.fields.size.value
      }
    )
  })
};
const protectionConvenience = {
  label: "Protection & Convenience Features",
  schema: fields.object({
    title: fields.text({ label: "Title" }),
    cards: fields.array(
      fields.object({
        icon: fields.image({
          label: "Icon",
          directory: "/src/assets/icons",
          publicPath: "/src/assets/icons"
        }),
        title: fields.text({ label: "Title" }),
        description: fields.text({ label: "Description", multiline: true })
      }),
      {
        label: "Storage Containers",
        itemLabel: (item) => item.fields.title.value
      }
    )
  })
};
const twoCol = {
  label: "Two Column",
  schema: fields.object({
    heading: fields.text({ label: "Heading" }),
    description: fields.markdoc.inline({ label: "Description" }),
    media: fields.conditional(
      fields.checkbox({
        label: "Use Video Instead of Image",
        defaultValue: false
      }),
      {
        true: fields.object({
          videoUrl: fields.text({ label: "Video URL" }),
          videoTitle: fields.text({ label: "Video Title" })
        }),
        false: fields.object({
          image: fields.image({
            label: "Image",
            directory: "/src/assets/images",
            publicPath: "/src/assets/images"
          })
        })
      }
    ),
    imagePlacement: fields.select({
      label: "Image Placement",
      options: [
        { label: "Left", value: "left" },
        { label: "Right", value: "right" }
      ],
      defaultValue: "left"
    }),
    colors: fields.select({
      label: "Color Scheme",
      options: [
        { label: "#0069e5", value: "#0069e5" },
        { label: "#0069e5 with 5 opacity", value: "#0069e5/5" }
      ],
      defaultValue: "#0069e5/5"
    }),
    button: fields.object({
      label: fields.text({ label: "Button Label" }),
      link: fields.text({ label: "Button Link" })
    })
  })
};
const cards = {
  label: "Cards With Title",
  schema: fields.object({
    title: fields.text({ label: "Title" }),
    cards: fields.array(
      fields.object({
        image: fields.image({
          label: "Image",
          directory: "/src/assets/images",
          publicPath: "/src/assets/images"
        }),
        title: fields.text({ label: "Title" }),
        description: fields.markdoc.inline({ label: "Description" })
      }),
      {
        label: "Storage Containers",
        itemLabel: (item) => item.fields.title.value
      }
    )
  })
};

const pages = {
  label: "Pages",
  slugField: "title",
  path: "src/data/pages/*",
  schema: {
    title: fields.slug({
      name: {
        label: "Page Title"
      }
    }),
    seoData: fields.object({
      seoTitle: fields.text({ label: "SEO Title" }),
      seoDescription: fields.text({
        label: "SEO Description",
        multiline: true
      }),
      ogImage: fields.image({
        label: "Open Graph Image",
        directory: "/public/images/seo/",
        publicPath: "/images/seo/"
      })
    }),
    blocks: fields.blocks(
      {
        mainHero,
        howPodsWork,
        featuredImage,
        reviewsSlider,
        findYouFit,
        faqs,
        masonaryGallery,
        podsHelpingBintoGrid,
        singleHero,
        storageOptions,
        protectionConvenience,
        twoCol,
        cards
      },
      { label: "Blocks" }
    )
  }
};

const reviews = {
  label: "Reviews",
  slugField: "name",
  path: "src/data/reviews/*",
  schema: {
    name: fields.slug({
      name: {
        label: "Name"
      }
    }),
    content: fields.text({
      label: "Review",
      multiline: true
    })
  }
};

const email = {
  label: "Emails",
  path: "src/data/singletons/email",
  schema: {
    logo: fields.object(
      {
        imageUrl: fields.text({
          label: "Image URL"
        }),
        altTag: fields.text({ label: "Alt Text" })
      },
      {
        label: "Email Logo",
        description: "This is the logo that will show at the top of your emails."
      }
    ),
    fromEmail: fields.text({
      label: "Email Address",
      description: "This is the email address from which emails are sent. Please do not change this without first confirming with the development team."
    }),
    fromEmailName: fields.text({
      label: "Email Name",
      description: "This is that will show in emails sent from the website in the 'From' field."
    }),
    adminEmailRecipients: fields.array(
      fields.object({
        name: fields.text({ label: "Name" }),
        email: fields.text({ label: "Email" })
      }),
      {
        label: "Admin Email Recipients",
        itemLabel: (props) => props.fields.name.value
      }
    ),
    clientEmailRecipientsBcc: fields.array(
      fields.object({
        name: fields.text({ label: "Name" }),
        email: fields.text({ label: "Email" })
      }),
      {
        label: "Client Email BCC Recipients",
        itemLabel: (props) => props.fields.name.value
      }
    )
  }
};

const footer = {
  label: "Footer",
  path: "src/data/singletons/footer",
  schema: {
    navitems: fields.array(
      fields.object({
        title: fields.text({ label: "Section Title" }),
        links: fields.array(
          fields.object({
            name: fields.text({ label: "Link Name" }),
            url: fields.text({ label: "URL" })
          }),
          {
            label: "Links",
            itemLabel: (props) => props.fields.name.value
          }
        )
      }),
      {
        label: "Footer Navitems",
        itemLabel: (props) => props.fields.title.value
      }
    ),
    socialLinks: fields.array(
      fields.object({
        icon: fields.image({
          label: "Icon",
          directory: "/src/assets/images/social/",
          publicPath: "/src/assets/images/social/"
        }),
        url: fields.text({ label: "URL" })
      }),
      { label: "Social Links" }
    ),
    legal: fields.array(
      fields.object({
        title: fields.text({ label: "Title" }),
        link: fields.text({ label: "Link" })
      }),
      {
        label: "Legal",
        itemLabel: (props) => props.fields.title.value
      }
    )
  }
};

const general = {
  label: "General Settings",
  path: "src/data/singletons/general",
  schema: {
    businessName: fields.text({ label: "Business Name" }),
    logo: fields.object(
      {
        logo: fields.image({
          label: "Logo",
          directory: "/src/assets/images/general",
          publicPath: "/src/assets/images/general/"
        }),
        favicon: fields.image({
          label: "Favicon",
          directory: "/src/assets/images/general",
          publicPath: "/src/assets/images/general/"
        }),
        footerLogo: fields.image({
          label: "Footer Logo",
          directory: "/src/assets/images/general",
          publicPath: "/src/assets/images/general/"
        })
      },
      {
        label: "Site Images"
      }
    ),
    contactInformation: fields.object(
      {
        email: fields.text({
          label: "Email Address"
        }),
        phone: fields.text({
          label: "Phone Number",
          description: "This will be used in elements like tel:"
        }),
        phoneDisplay: fields.text({
          label: "Phone Number Display",
          description: "Phone number as it appears in the user interface"
        })
      },
      {
        label: "General Information"
      }
    ),
    businessHours: fields.text({ label: "Business Hours" }),
    analyticsScripts: fields.array(
      fields.object({
        name: fields.text({ label: "Name" }),
        script: fields.text({ label: "Script", multiline: true }),
        location: fields.select({
          label: "Location",
          options: [
            { label: "Head", value: "head" },
            { label: "Body", value: "body" }
          ],
          defaultValue: "head"
        })
      }),
      {
        label: "Analytics Scripts",
        itemLabel: (props) => props.fields.name.value
      }
    )
  }
};

const header = {
  label: "Header",
  path: "src/data/singletons/header",
  schema: {
    subHeader: fields.text({ label: "Sub Header" }),
    menuItems: fields.array(
      fields.object({
        name: fields.text({ label: "Name" }),
        link: fields.text({ label: "Link" }),
        subMenu: fields.array(
          fields.object({
            name: fields.text({ label: "Name" }),
            link: fields.text({ label: "Link" })
          }),
          {
            label: "Sub Menu",
            itemLabel: (props) => props.fields.name.value
          }
        )
      }),
      {
        label: "Menu Items",
        itemLabel: (props) => props.fields.name.value
      }
    ),
    button: fields.object({
      enable: fields.checkbox({ label: "Enable" }),
      label: fields.text({ label: "Label" }),
      link: fields.text({ label: "Link" })
    })
  }
};

const config = config$1({
  storage: {
    kind: "cloud"
  },
  cloud: {
    project: "mi-box-wv/miboxvw"
  },
  ui: {
    brand: { name: "MI-Box Vermont" }
  },
  collections: {
    blogs: collection(blogs),
    pages: collection(pages),
    reviews: collection(reviews)
  },
  singletons: {
    general: singleton(general),
    email: singleton(email),
    header: singleton(header),
    footer: singleton(footer)
  }
});

const all = makeHandler({ config });
const ALL = all;

const prerender = false;

const _page = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
  __proto__: null,
  ALL,
  all,
  prerender
}, Symbol.toStringTag, { value: 'Module' }));

const page = () => _page;

export { page };
